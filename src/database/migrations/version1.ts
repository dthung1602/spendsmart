const defaultCategories = [
  { title: "", parentTitle: undefined }, // root category
  { title: "living", parentTitle: "" },
  { title: "housing", parentTitle: "living" },
  { title: "utilities", parentTitle: "living" },
  { title: "food", parentTitle: "" },
  { title: "main meals", parentTitle: "food" },
  { title: "snack & coffee", parentTitle: "food" },
  { title: "transportation", parentTitle: "" },
  { title: "healthcare", parentTitle: "" },
  { title: "entertainment", parentTitle: "" },
  { title: "investment", parentTitle: "" },
  { title: "personal spending", parentTitle: "" },
  { title: "miscellaneous", parentTitle: "" },
];

const defaultGlobalConfig = {
  viewedTour: 0,
};

export default function (db: IDBDatabase): void {
  const catObjectStore = db.createObjectStore("Categories", {
    keyPath: "title",
  });

  catObjectStore.transaction.oncomplete = () => {
    const objectStore = db
      .transaction("Categories", "readwrite")
      .objectStore("Categories");
    defaultCategories.forEach((cat) => catObjectStore.add(cat));
  };

  const globalConfigObjectStore = db.createObjectStore("GlobalConfigs");

  globalConfigObjectStore.transaction.oncomplete = () => {
    const objectStore = db
      .transaction("GlobalConfigs", "readwrite")
      .objectStore("GlobalConfigs");
    Object.entries(defaultGlobalConfig).map((k, v) => {
      objectStore.add(v, k);
    });
  };

  db.createObjectStore("Transactions", { keyPath: "id" });

  db.createObjectStore("TransactionHistories", { keyPath: "id" });
}
