import { DB_VERSION } from "../utils/constants";
import { Nullable } from "../utils/types";
import { DBError } from "../utils/errors";
import migrate from "./migrations";
import CategoryDatastore from "./datastores/CategoryDatastore";
import TransactionDatastore from "./datastores/TransactionDatastore";
import TransactionHistoryDatastore from "./datastores/TransactionHistoryDatastore";
import GlobalConfigDatastore from "./datastores/GlobalConfigDatastore";
import {
  Category,
  Transaction,
  TransactionHistory,
  GlobalConfig,
} from "./models";

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

const category = new CategoryDatastore(Category, "Categories", getDB);
const transaction = new TransactionDatastore(
  Transaction,
  "Transactions",
  getDB
);
const transactionHistory = new TransactionHistoryDatastore(
  TransactionHistory,
  "TransactionHistories",
  getDB
);
const globalConfig = new GlobalConfigDatastore(
  GlobalConfig,
  "GlobalConfigs",
  getDB
);

export {
  initDB,
  category,
  transaction,
  transactionHistory,
  globalConfig,
  Category,
  Transaction,
  TransactionHistory,
  GlobalConfig,
};
