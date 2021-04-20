import en from "../../assets/translations/en.json";
import vi from "../../assets/translations/vi.json";

import localStorage from "../localstorage";

const availableTranslations = { en, vi };

type DefaultCatTitleType = keyof typeof en["default-categories"];

const defaultCategories = [
  { title: "living", parentTitle: undefined, icon: "faHouseUser" },
  { title: "housing", parentTitle: "living", icon: "faHome" },
  { title: "water", parentTitle: "living", icon: "faFaucet" },
  { title: "electricity", parentTitle: "living", icon: "faPlug" },
  { title: "wifi-phone", parentTitle: "living", icon: "faWifi" },
  { title: "food", parentTitle: undefined, icon: "faUtensils" },
  { title: "main-meals", parentTitle: "food", icon: "faHamburger" },
  { title: "snack-coffee", parentTitle: "food", icon: "faCoffee" },
  { title: "transportation", parentTitle: undefined, icon: "faCar" },
  { title: "healthcare", parentTitle: undefined, icon: "faMedkit" },
  { title: "entertainment", parentTitle: undefined, icon: "faMusic" },
  { title: "investment", parentTitle: undefined, icon: "faPiggyBank" },
  { title: "personal-spending", parentTitle: undefined, icon: "faUser" },
  { title: "charity", parentTitle: undefined, icon: "faHandHoldingHeart" },
  { title: "travelling", parentTitle: undefined, icon: "faPlane" },
  { title: "miscellaneous", parentTitle: undefined, icon: "faRandom" },
];

function loadDefaultCategories(store: IDBObjectStore) {
  const translation =
    availableTranslations[localStorage.language]["default-categories"];

  defaultCategories.forEach(({ title, parentTitle, icon }) => {
    store.add({
      title: translation[title as DefaultCatTitleType],
      parentTitle: translation[parentTitle as DefaultCatTitleType],
      icon,
    });
  });
}

export default function (db: IDBDatabase): void {
  const catStore = db.createObjectStore("Categories", {
    keyPath: "title",
  });
  loadDefaultCategories(catStore);

  db.createObjectStore("Transactions", { keyPath: "id" });

  db.createObjectStore("TransactionHistories", { keyPath: "id" });
}
