import { DBError } from "../../utils/errors";
import { Nullable, Optional, IDBResultEvent } from "../../utils/types";
import AbstractModel from "../models/AbstractModel";

type Compare<T> =
  | T
  | { eq: T }
  | { neq: T }
  | { gt: T }
  | { gte: T }
  | { lt: T }
  | { lte: T };

type OmitMethods<ModelClass> = Omit<
  ModelClass,
  "findAll" | "find" | "findOne" | "create"
>;

type FilterObject<ModelClass> = {
  [Property in keyof OmitMethods<ModelClass>]+?: Compare<ModelClass[Property]>;
};

abstract class AbstractDatastore<ModelClassType extends AbstractModel> {
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

      object.preSave();

      const request = db
        .transaction(this.objectStoreName, "readwrite")
        .objectStore(this.objectStoreName)
        .add(object);

      request.onerror = (event) => reject(new DBError(event));
      request.onsuccess = () => {
        resolve(object);
      };
    });
  }

  delete(object: ModelClassType): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const db = this.dbFactory();
      if (!db) {
        reject(new DBError("Cannot find IndexedDB"));
        return;
      }

      const request = db
        .transaction(this.objectStoreName, "readwrite")
        .objectStore(this.objectStoreName)
        .delete(object.getKey());

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(new DBError(event));
    });
  }
}

export default AbstractDatastore;
