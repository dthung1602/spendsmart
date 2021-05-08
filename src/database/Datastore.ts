import { DBError } from "../utils/errors";
import type {
  Nullable,
  Optional,
  Class,
  XOR,
  NoExtra,
  IDBResultEvent,
  Path,
  NonFunctionKeys,
  PathValue,
} from "../utils/types";
import AbstractModel from "./models/AbstractModel";
import { stemString } from "../utils";

interface IndexPreference<Model> {
  readonly INDICES_PREFERENCE_ORDER: {
    field: Path<Model> | "$text";
    index: string;
  }[];
}

type ModelClass<Model> = Class<Model> & IndexPreference<Model>;

type SelectedIndex = {
  field: string;
  index: string;
  query: any;
};

type EqualQuery<T> = NoExtra<{ $eq: T }>;
type LessThanQuery<T> = XOR<{ $lte: T }, { $lt: T }>;
type GreaterThanQuery<T> = XOR<{ $gte: T }, { $gt: T }>;
type RangeQuery<T> = LessThanQuery<T> & GreaterThanQuery<T>;

type Query<T> = XOR<
  EqualQuery<T>,
  XOR<XOR<GreaterThanQuery<T>, LessThanQuery<T>>, RangeQuery<T>>
>;

type TextQuery = { $text?: string };

type Pagination = {
  $limit?: number;
  $skip?: number;
};

type ComparableQuery<Model> = {
  [K in Path<Model>]?: Query<PathValue<Model, K>>;
};

type FilterObject<Model> = ComparableQuery<Model> & TextQuery & Pagination;

class NonIndexedFilters<Model> {
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
    for (const entry of Object.entries(this.filter)) {
      const field = entry[0] as NonFunctionKeys<Model>;
      const query = entry[1] as any;

      if (query.hasOwnProperty("$eq")) {
        if (object[field] === query["$eq"]) {
          match = false;
          break;
        }
      }
      if (query.hasOwnProperty("$lte")) {
        if (object[field] > query["$lte"]) {
          match = false;
          break;
        }
      }
      if (query.hasOwnProperty("$lt")) {
        if (object[field] >= query["$lt"]) {
          match = false;
          break;
        }
      }
      if (query.hasOwnProperty("$gte")) {
        if (object[field] < query["$gte"]) {
          match = false;
          break;
        }
      }
      if (query.hasOwnProperty("$gt")) {
        if (object[field] <= query["$gt"]) {
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

  public findOne(filters: FilterObject<Model>): Promise<Optional<Model>> {
    return this.find({ ...filters, $limit: 1, $skip: 0 }).then(
      (objs) => objs[0]
    );
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

      const nonIndexedFilters = new NonIndexedFilters(filters);

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

      const cursor = this.openCursor(selectedIndex);
      cursor.onerror = handleError;
      cursor.onsuccess = onObjectFound;
    });
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

  private openCursor(selectedIndex: SelectedIndex | undefined): IDBRequest {
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

  private getIndexRange(selectedIndex: SelectedIndex): IDBKeyRange {
    const key =
      selectedIndex.field === "$text"
        ? "$text"
        : Object.keys(selectedIndex.query).sort().join("");
    return keyRangeMapping[key](selectedIndex.query);
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
  $text: (query: any) => IDBKeyRange.only(query),
  "": (query: any) => IDBKeyRange.only(query.$eq),
};

export default Datastore;
