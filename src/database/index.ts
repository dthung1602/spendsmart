import { DB_VERSION } from "../types/constants";
import { Nullable } from "../types";
import { DBError } from "../errors";
import migrate from "./migrations";
import CategoryDatastore from "./CategoryDatastore";
import TransactionDatastore from "./TransactionDatastore";
import TransactionHistoryDatastore from "./TransactionHistoryDatastore";
import GlobalConfigDatastore from "./GlobalConfigDatastore";
import {
  Category,
  Transaction,
  TransactionHistory,
  GlobalConfig,
} from "../models";

const db: Nullable<IDBDatabase> = null;

function initDB(): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("SpendSmartDB", DB_VERSION);

    request.onerror = function (event: Event) {
      reject(new DBError(event));
    };

    request.onsuccess = () => resolve();

    request.onupgradeneeded = migrate;
  });
}

function getDB(): Nullable<IDBDatabase> {
  return db;
}

const category = new CategoryDatastore(Category, "Category", getDB);
const transaction = new TransactionDatastore(Transaction, "Transaction", getDB);
const transactionHistory = new TransactionHistoryDatastore(
  TransactionHistory,
  "TransactionHistory",
  getDB
);
const globalConfig = new GlobalConfigDatastore(
  GlobalConfig,
  "GlobalConfig",
  getDB
);

export { initDB, category, transaction, transactionHistory, globalConfig };
