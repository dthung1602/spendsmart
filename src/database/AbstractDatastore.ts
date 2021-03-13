import { DBError } from "../errors";
import { Nullable, Optional, IDBResultEvent } from "../types";

type FilterObject<ModelClass> = {
  [Property in keyof ModelClass]+?: ModelClass[Property];
};

class AbstractDatastore<ModelClassType> {
  constructor(
    protected readonly ModelClass: new (...args: any[]) => ModelClassType,
    protected readonly objectStoreName: string,
    protected dbFactory: () => Nullable<IDBDatabase>
  ) {}

  public find(
    filters: FilterObject<ModelClassType>
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

      transaction.oncomplete = () => resolve(result);

      // TODO an optimized implementation using indices
      const request = objectStore.getAll();
      request.onsuccess = (event: Event) => {
        result = (event as IDBResultEvent<ModelClassType[]>).target.result
          .filter((o) => {
            for (const [k, v] of Object.entries(o)) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // TODO for now only support equal filter
              if (v !== filters[k]) {
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
}

export default AbstractDatastore;
