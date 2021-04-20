import { DB_VERSION } from "../utils/constants";
import { IDBResultEvent, Nullable } from "../utils/types";
import { DBError } from "../utils/errors";
import migrate from "./migrations";
import localStorage from "./localstorage";
import CategoryDatastore from "./datastores/CategoryDatastore";
import TransactionDatastore from "./datastores/TransactionDatastore";
import TransactionHistoryDatastore from "./datastores/TransactionHistoryDatastore";
import { Category, Transaction, TransactionHistory } from "./models";

let db: Nullable<IDBDatabase> = null;

function initDB(): Promise<void> {
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

const categoryDataStore = new CategoryDatastore(Category, "Categories", getDB);
const transactionDataStore = new TransactionDatastore(
  Transaction,
  "Transactions",
  getDB
);
const transactionHistoryDataStore = new TransactionHistoryDatastore(
  TransactionHistory,
  "TransactionHistories",
  getDB
);

export {
  initDB,
  localStorage,
  categoryDataStore,
  transactionDataStore,
  transactionHistoryDataStore,
  Category,
  Transaction,
  TransactionHistory,
};
