import en from "../../assets/translations/en.json";
import vi from "../../assets/translations/vi.json";

import Transaction from "../models/Transaction";
import Category from "../models/Category";
import localStorage from "../localstorage";

const availableTranslations = { en, vi };

type DefaultCatTitleType = keyof typeof en["default-categories"];
type CategorySkeleton = Pick<Category, "id" | "title" | "parentId" | "icon">;

const defaultCategories: CategorySkeleton[] = [
  { id: 1, title: "living", parentId: undefined, icon: "house-user" },
  { id: 2, title: "housing", parentId: 1, icon: "home" },
  { id: 3, title: "water", parentId: 1, icon: "faucet" },
  { id: 4, title: "electricity", parentId: 1, icon: "plug" },
  { id: 5, title: "wifi-phone", parentId: 1, icon: "wifi" },
  { id: 6, title: "food", parentId: undefined, icon: "utensils" },
  { id: 7, title: "main-meals", parentId: 6, icon: "hamburger" },
  { id: 8, title: "snack-coffee", parentId: 6, icon: "coffee" },
  { id: 9, title: "transportation", parentId: undefined, icon: "car" },
  { id: 10, title: "healthcare", parentId: undefined, icon: "medkit" },
  { id: 11, title: "entertainment", parentId: undefined, icon: "music" },
  { id: 12, title: "investment", parentId: undefined, icon: "piggy-bank" },
  { id: 13, title: "personal-spending", parentId: undefined, icon: "user" },
  { id: 14, title: "charity", parentId: undefined, icon: "hand-holding-heart" },
  { id: 15, title: "travelling", parentId: undefined, icon: "plane" },
  { id: 16, title: "miscellaneous", parentId: undefined, icon: "random" },
];

function loadDefaultCategories(store: IDBObjectStore) {
  const translation =
    availableTranslations[localStorage.language]["default-categories"];

  defaultCategories.forEach(({ id, title, parentId, icon }) => {
    store.add({
      id,
      title: translation[title as DefaultCatTitleType],
      parentId,
      icon,
    });
  });
}

function createTransactionIndices(store: IDBObjectStore) {
  store.createIndex(Transaction.SPEND_DATETIME_INDEX, "spendDatetime");
  store.createIndex(Transaction.CATEGORY_INDEX, "categoriesTitles", {
    multiEntry: true,
  });
  store.createIndex(Transaction.TEXT_INDEX, "$text", { multiEntry: true });
}

export default function (db: IDBDatabase): void {
  const catStore = db.createObjectStore("Categories", {
    keyPath: "id",
  });
  loadDefaultCategories(catStore);

  const tranStore = db.createObjectStore("Transactions", { keyPath: "id" });
  createTransactionIndices(tranStore);
}
