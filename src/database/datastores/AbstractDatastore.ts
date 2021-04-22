import { DBError } from "../../utils/errors";
import { Nullable, Optional, IDBResultEvent } from "../../utils/types";
import AbstractModel from "../models/AbstractModel";

type FilterObject<ModelClass> = {
  [Property in keyof ModelClass]+?: ModelClass[Property];
};

class AbstractDatastore<ModelClassType extends AbstractModel> {
  constructor(
    protected readonly ModelClass: new (...args: any[]) => ModelClassType,
    protected readonly objectStoreName: string,
    protected dbFactory: () => Nullable<IDBDatabase>
  ) {}

  public findAll(): Promise<ModelClassType[]> {
    return this.find({});
  }

  public find(
    filters: FilterObject<ModelClassType> = {}
  ): Promise<ModelClassType[]> {
    return new Promise((resolve, reject) => {
      const db = this.dbFactory();
      if (!db) {
        reject(new DBError("Cannot find IndexedDB"));
        return;
      }

      let result: ModelClassType[] = [];
      const transaction = db.transaction(this.objectStoreName, "readonly");
      const objectStore = transaction.objectStore(this.objectStoreName);

      transaction.onerror = (event) => {
        reject(new DBError(event));
      };

      transaction.oncomplete = () => {
        resolve(result);
      };

      // TODO an optimized implementation using indices
      const request = objectStore.getAll();
      request.onsuccess = (event: Event) => {
        result = (event as IDBResultEvent<ModelClassType[]>).target.result
          .filter((o) => {
            for (const [k, v] of Object.entries(filters)) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // TODO for now only support equal filter
              if (v !== o[k]) {
                return false;
              }
            }
            return true;
          })
          .map((o) => new this.ModelClass(o));
      };
    });
  }

  public findOne(
    filters: FilterObject<ModelClassType>
  ): Promise<Optional<ModelClassType>> {
    // TODO an optimized implementation using indices
    return this.find(filters).then((obs) => obs[0]);
  }

  public create(object: ModelClassType): Promise<Optional<ModelClassType>> {
    return new Promise((resolve, reject) => {
      const db = this.dbFactory();
      if (!db) {
        reject(new DBError("Cannot find IndexedDB"));
        return;
      }

      const transaction = db.transaction(this.objectStoreName, "readwrite");
      const objectStore = transaction.objectStore(this.objectStoreName);

      transaction.onerror = (event) => {
        reject(new DBError(event));
      };

      object.preSave();
      const request = objectStore.add(object);
      request.onsuccess = () => {
        resolve(object);
      };
    });
  }
}

export default AbstractDatastore;
