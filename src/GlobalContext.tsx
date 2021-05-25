import React, { createContext, useState, useEffect } from "react";

import type { Language } from "./utils/types";

import { Category, categoryDataStore, localStorage } from "./database";
import { categoriesToSelectOptions } from "./utils";
import type { VerticalScrollSelectOptionValue } from "./components";

interface GlobalContextProps {
  children: JSX.Element;
}

/* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars */
const defaultContextValue = {
  language: localStorage.language || "en",
  setLanguage: (language: Language) => {},
  overlayOpen: false as boolean,
  setOverlayOpen: (open: boolean) => {},
  allCategories: [] as Category[],
  reloadCategories: () => {},
  categoryOptions: [] as VerticalScrollSelectOptionValue<number>[],
} as const;
/* eslint-enable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars */

const GlobalContext = createContext(defaultContextValue);

function GlobalContextProvider(props: GlobalContextProps): JSX.Element {
  const [language, setLanguage] = useState<Language>(
    defaultContextValue.language
  );
  const [overlayOpen, setOverlayOpen] = useState<boolean>(
    defaultContextValue.overlayOpen
  );
  const [allCategories, setAllCategories] = useState<Category[]>(
    defaultContextValue.allCategories
  );

  const categoryOptions = categoriesToSelectOptions(allCategories);

  const reloadCategories = () => {
    categoryDataStore.findAll().then((cats) => {
      setAllCategories(cats);
    });
  };

  useEffect(() => {
    localStorage.language = language;
  }, [language]);

  useEffect(reloadCategories, []);

  const value = {
    language,
    setLanguage,
    overlayOpen,
    setOverlayOpen,
    allCategories,
    reloadCategories,
    categoryOptions,
  };

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalContextProvider };
