import { DBError } from "../../utils/errors";
import { Nullable, Optional, IDBResultEvent } from "../../utils/types";

type FilterObject<ModelClass> = {
  [Property in keyof ModelClass]+?: ModelClass[Property];
};

class AbstractDatastore<ModelClassType> {
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
      console.log("find");
      const db = this.dbFactory();
      if (!db) {
        reject(new DBError("Cannot find IndexedDB"));
        return;
      }

      let result: ModelClassType[] = [];
      const transaction = db.transaction(this.objectStoreName, "readonly");
      const objectStore = transaction.objectStore(this.objectStoreName);

      transaction.onerror = (event) => {
        console.log("error");
        reject(new DBError(event));
      };

      transaction.oncomplete = () => {
        console.log({ result });
        resolve(result);
      };

      // TODO an optimized implementation using indices
      const request = objectStore.getAll();
      request.onsuccess = (event: Event) => {
        console.log({ event });
        result = (event as IDBResultEvent<ModelClassType[]>).target.result
          .filter((o) => {
            console.log({ o });
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
        console.log("get all completed");
      };
    });
  }

  public findOne(
    filters: FilterObject<ModelClassType>
  ): Promise<Optional<ModelClassType>> {
    return new Promise((resolve, reject) => {
      const db = this.dbFactory();
      if (!db) {
        reject(new DBError("Cannot find IndexedDB"));
        return;
      }

      let result: Optional<ModelClassType> = null;
      const transaction = db.transaction(this.objectStoreName, "readonly");
      const objectStore = transaction.objectStore(this.objectStoreName);

      transaction.onerror = (event) => {
        reject(new DBError(event));
      };

      transaction.oncomplete = () => resolve(result);

      // TODO an optimized implementation using indices
      const request = objectStore.getAll();
      request.onsuccess = (event: Event) => {
        const matched = (event as IDBResultEvent<
          ModelClassType[]
        >).target.result.filter((o) => {
          for (const [k, v] of Object.entries(o)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // TODO for now only support equal filter
            if (v !== filters[k]) {
              return false;
            }
          }
          return true;
        });
        if (matched) {
          result = new this.ModelClass(matched[0]);
        }
      };
    });
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

      const request = objectStore.add(object);
      request.onsuccess = () => {
        resolve(object);
      };
    });
  }
}

export default AbstractDatastore;
