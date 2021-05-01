import { DBError } from "../utils/errors";
import { Nullable, Optional, Class, IDBResultEvent } from "../utils/types";
import type { NonFunctionProperties } from "../utils/types";
import { stemString } from "../utils";
import AbstractModel from "./models/AbstractModel";
import { Transaction } from "./models";

type AcceptableFieldType = string | number | boolean | Date;

type EqualQuery<T> = T | { $eq: T };
type LessThanQuery<T> = { $lte: T };
type GreaterThanQuery<T> = { $gte: T };
type TextQuery = { $text: string };

type Query<T extends AcceptableFieldType> =
  | EqualQuery<T>
  | LessThanQuery<T>
  | GreaterThanQuery<T>
  | (LessThanQuery<T> & GreaterThanQuery<T>)
  | TextQuery;

type Pagination = {
  $limit?: number;
  $skip?: number;
};

type FilterObject<Model extends AbstractModel> = Pagination &
  {
    [Property in keyof NonFunctionProperties<Model>]+?: Query<Model[Property]>;
  };

interface IndexPreference<Model> {
  readonly INDICES_PREFERENCE_ORDER: {
    field: keyof NonFunctionProperties<Model>;
    index: string;
  }[];
}

type SelectedIndex<Model> = {
  field: keyof NonFunctionProperties<Model>;
  index: string;
  query: Query<Model[keyof NonFunctionProperties<Model>]>;
};

type ModelClass<Model extends AbstractModel> = Class<Model> &
  IndexPreference<Model>;

class NonIndexedFilters<Model extends AbstractModel> {
  private readonly filter: FilterObject<Model>;
  private limit: number;
  private skip: number;

  constructor(filter: FilterObject<Model>) {
    this.filter = filter;
    this.limit = filter.$limit || Number.MAX_SAFE_INTEGER;
    this.skip = filter.$skip || 0;
  }

  public match(object: Model): boolean {
    let match = true;
    for (const [field, query] of Object.entries(this.filter)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (query.hasOwnProperty("$eq")) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (object[field] === query["$eq"]) {
          match = false;
          break;
        }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (query.hasOwnProperty("$lte")) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (object[field] > query["$lte"]) {
          match = false;
          break;
        }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (query.hasOwnProperty("$gte")) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (object[field] < query["$gte"]) {
          match = false;
          break;
        }
      }
    }
    if (match) {
      if (this.skip > 0) {
        this.skip--;
        match = false;
      } else if (this.limit > 0) {
        this.limit--;
      }
    }
    return match;
  }

  public shouldContinue() {
    return this.limit > 0;
  }
}

// https://www.codeproject.com/Articles/744986/How-to-do-some-magic-with-indexedDB
class Datastore<Model extends AbstractModel> {
  constructor(
    protected readonly ModelClass: ModelClass<Model>,
    protected readonly objectStoreName: string,
    protected dbFactory: () => Nullable<IDBDatabase>
  ) {}

  private get db() {
    return this.dbFactory();
  }

  public findAll(): Promise<Model[]> {
    return this.find({});
  }

  public find(filters: FilterObject<Model>): Promise<Model[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new DBError("Cannot find IndexedDB"));
        return;
      }

      let selectedIndex;

      for (const index of this.ModelClass.INDICES_PREFERENCE_ORDER) {
        if (filters.hasOwnProperty(index.field)) {
          selectedIndex = {
            ...index,
            query: filters[index.field],
          } as SelectedIndex<Model>;
          delete filters[index.field];
        }
      }

      const nonIndexedFilters = new NonIndexedFilters(filters);

      const result: Model[] = [];
      const handleError = (e: string | Event) => reject(new DBError(e));
      const onObjectFound = (event: Event) => {
        const cursor = (event as IDBResultEvent<IDBCursorWithValue>).target
          .result;
        if (cursor) {
          if (nonIndexedFilters.match(cursor.value)) {
            result.push(cursor.value);
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

      const cursor = this.openCursor(selectedIndex);
      cursor.onerror = handleError;
      cursor.onsuccess = onObjectFound;
    });
  }

  public findOne(filters: FilterObject<Model>): Promise<Optional<Model>> {
    // TODO an optimized implementation using indices
    return this.find(filters).then((obs) => obs[0]);
  }

  public create(object: Model): Promise<Optional<Model>> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new DBError("Cannot find IndexedDB"));
        return;
      }

      object.preSave();

      const request = this.db
        .transaction(this.objectStoreName, "readwrite")
        .objectStore(this.objectStoreName)
        .add(object);

      request.onerror = (event) => reject(new DBError(event));
      request.onsuccess = () => {
        resolve(object);
      };
    });
  }

  public delete(object: Model): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.db) {
        reject(new DBError("Cannot find IndexedDB"));
        return;
      }

      const request = this.db
        .transaction(this.objectStoreName, "readwrite")
        .objectStore(this.objectStoreName)
        .delete(object.getKey());

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(new DBError(event));
    });
  }

  private openCursor(
    selectedIndex: SelectedIndex<Model> | undefined
  ): IDBRequest {
    const objectStore = (this.db as IDBDatabase)
      .transaction(this.objectStoreName, "readonly")
      .objectStore(this.objectStoreName);
    if (selectedIndex) {
      return objectStore
        .index(selectedIndex.index)
        .openCursor(this.getIndexRange(selectedIndex));
    } else {
      return objectStore.openCursor();
    }
  }

  private getIndexRange(selectedIndex: SelectedIndex<Model>): IDBKeyRange {
    const key = Object.keys(selectedIndex.query).sort().join("");
    return keyRangeMapping[key](selectedIndex.query);
  }
}

const keyRangeMapping: Record<string, (query: any) => IDBKeyRange> = {
  $gte: (query: any) => IDBKeyRange.lowerBound(query.$gte),
  $gt: (query: any) => IDBKeyRange.lowerBound(query.$gt, true),
  $lte: (query: any) => IDBKeyRange.upperBound(query.$lte),
  $lt: (query: any) => IDBKeyRange.upperBound(query.$lt, true),
  $gte$lte: (query: any) => IDBKeyRange.bound(query.$gte, query.$lte),
  $gt$lt: (query: any) => IDBKeyRange.bound(query.$gt, query.$lt, true, true),
  $gt$lte: (query: any) =>
    IDBKeyRange.bound(query.$gt, query.$lte, true, false),
  $gte$lt: (query: any) =>
    IDBKeyRange.bound(query.$gte, query.$lt, false, true),
  $eq: (query: any) => IDBKeyRange.only(query.$eq),
};

export default Datastore;
