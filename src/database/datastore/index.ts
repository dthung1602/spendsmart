import AbstractModel from "../models/AbstractModel";
import NonIndexedFieldFilters from "./non-indexed-field-filters";
import getIndexRange from "./index-range-builder";
import { DBError } from "../../utils/errors";
import { stemString } from "../../utils";

import { Optional, IDBResultEvent } from "../../utils/types";
import type { FilterObject, SelectedIndex, ModelClass } from "./type";

// https://www.codeproject.com/Articles/744986/How-to-do-some-magic-with-indexedDB
// TODO some agg
class Datastore<Model extends AbstractModel> {
  constructor(
    protected readonly ModelClass: ModelClass<Model>,
    protected readonly objectStoreName: string,
    protected dbFactory: () => Promise<IDBDatabase>
  ) {}

  public findAll(): Promise<Model[]> {
    return this.find({});
  }

  public findOne(filters: FilterObject<Model>): Promise<Optional<Model>> {
    return this.find({ ...filters, $limit: 1, $skip: 0 }).then(
      (objs) => objs[0]
    );
  }

  public find(filters: FilterObject<Model>): Promise<Model[]> {
    return new Promise((resolve, reject) => {
      this.dbFactory()
        .then((db) => {
          let selectedIndex;

          for (const index of this.ModelClass.INDICES_PREFERENCE_ORDER) {
            if (filters.hasOwnProperty(index.field)) {
              selectedIndex = {
                ...index,
                query: filters[index.field],
              };
              delete filters[index.field];
              break;
            }
          }

          if (selectedIndex?.field === "$text") {
            const stemmed = stemString(selectedIndex.query as string);
            if (stemmed.length > 1) {
              Promise.all(
                stemmed.map((word) => this.find({ ...filters, $text: word }))
              )
                .then((partialResults) => {
                  resolve(this.mergeResults(partialResults));
                })
                .catch((e) => reject(new DBError(e)));
              return;
            } else {
              selectedIndex.query = stemmed[0] as typeof selectedIndex.query;
            }
          }

          const nonIndexedFilters = new NonIndexedFieldFilters(filters);

          const result: Model[] = [];
          const handleError = (e: string | Event) => reject(new DBError(e));
          const onObjectFound = (event: Event) => {
            const cursor = (event as IDBResultEvent<IDBCursorWithValue>).target
              .result;
            if (cursor) {
              const match = nonIndexedFilters.match(cursor.value);
              if (match) {
                result.push(new this.ModelClass(cursor.value));
              }
              if (nonIndexedFilters.shouldContinue()) {
                cursor.continue();
              } else {
                resolve(result);
              }
            } else {
              resolve(result);
            }
          };

          const cursor = this.openCursor(db, selectedIndex);
          cursor.onerror = handleError;
          cursor.onsuccess = onObjectFound;
        })
        .catch(() => reject(new DBError("Cannot find IndexedDB")));
    });
  }

  public create(object: Model): Promise<Optional<Model>> {
    return new Promise((resolve, reject) => {
      this.dbFactory()
        .then((db) => {
          object.preSave();

          const request = db
            .transaction(this.objectStoreName, "readwrite")
            .objectStore(this.objectStoreName)
            .add(object);

          request.onerror = (event) => reject(new DBError(event));
          request.onsuccess = () => {
            resolve(object);
          };
        })
        .catch(() => reject(new DBError("Cannot find IndexedDB")));
    });
  }

  public delete(object: Model): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.dbFactory()
        .then((db) => {
          const request = db
            .transaction(this.objectStoreName, "readwrite")
            .objectStore(this.objectStoreName)
            .delete(object.getKey());

          request.onsuccess = () => resolve();
          request.onerror = (event) => reject(new DBError(event));
        })
        .catch(() => reject(new DBError("Cannot find IndexedDB")));
    });
  }

  private openCursor(
    db: IDBDatabase,
    selectedIndex: SelectedIndex | undefined
  ): IDBRequest {
    const objectStore = db
      .transaction(this.objectStoreName, "readonly")
      .objectStore(this.objectStoreName);
    if (selectedIndex) {
      return objectStore
        .index(selectedIndex.index)
        .openCursor(getIndexRange(selectedIndex));
    } else {
      return objectStore.openCursor();
    }
  }

  private mergeResults(partialResults: Model[][]): Model[] {
    const result = new Map<ReturnType<AbstractModel["getKey"]>, Model>();
    for (const partialResult of partialResults) {
      for (const obj of partialResult) {
        if (!result.has(obj.getKey())) {
          result.set(obj.getKey(), obj);
        }
      }
    }
    return Array.from(result.values());
  }
}

export default Datastore;
