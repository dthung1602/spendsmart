import { DB_VERSION } from "../utils/constants";
import { IDBResultEvent, Nullable } from "../utils/types";
import { DBError } from "../utils/errors";
import migrate from "./migrations";
import localStorage from "./localstorage";
import Datastore from "./datastore";
import { Category, Transaction } from "./models";

let db: Nullable<IDBDatabase> = null;

function initDB(): Promise<void> {
  if (db) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("SpendSmartDB", DB_VERSION);

    request.onerror = function (event: Event) {
      reject(new DBError(event));
    };

    request.onsuccess = (event) => {
      db = (event as IDBResultEvent<IDBDatabase>).target.result;
      resolve();
    };

    request.onupgradeneeded = migrate;
  });
}

function getDB(): Nullable<IDBDatabase> {
  return db;
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
