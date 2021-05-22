import { DB_VERSION } from "../utils/constants";
import { IDBResultEvent } from "../utils/types";
import { DBError } from "../utils/errors";
import migrate from "./migrations";
import localStorage from "./localstorage";
import Datastore from "./datastore";
import { Category, Transaction } from "./models";

let resolveDB: (db: IDBDatabase) => void;
let rejectDB: (e: Error) => void;
const dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
  resolveDB = resolve;
  rejectDB = reject;
});

function initDB(): Promise<IDBDatabase> {
  const request = window.indexedDB.open("SpendSmartDB", DB_VERSION);

  request.onerror = function (event: Event) {
    rejectDB(new DBError(event));
  };

  request.onsuccess = (event) => {
    resolveDB((event as IDBResultEvent<IDBDatabase>).target.result);
  };

  request.onupgradeneeded = migrate;

  return dbPromise;
}

function getDB(): Promise<IDBDatabase> {
  return dbPromise;
}

const categoryDataStore = new Datastore(Category, "Categories", getDB);
const transactionDataStore = new Datastore(Transaction, "Transactions", getDB);

export {
  initDB,
  localStorage,
  categoryDataStore,
  transactionDataStore,
  Category,
  Transaction,
};
