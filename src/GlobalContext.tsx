import React, { createContext, useState, useEffect } from "react";

import type { Language } from "./utils/types";

import { localStorage } from "./database";

interface GlobalContextProps {
  children: JSX.Element;
}

/* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars */
const defaultContextValue = {
  language: localStorage.language || "en",
  setLanguage: (language: Language) => {},
  overlayOpen: false as boolean,
  setOverlayOpen: (open: boolean) => {},
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

  useEffect(() => {
    localStorage.language = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    overlayOpen,
    setOverlayOpen,
  };

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalContextProvider };
