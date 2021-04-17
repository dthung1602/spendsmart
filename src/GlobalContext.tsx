import React, { createContext, useState } from "react";

import type { Language } from "./utils/types";

interface GlobalContextProps {
  children: JSX.Element;
}

/* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars */
const defaultContextValue = {
  language: window.localStorage.getItem("language") as Language | "en",
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

  const setLanguageWrapper = (lang: Language) => {
    window.localStorage.setItem("language", lang);
    setLanguage(lang);
  };

  const value = {
    language,
    setLanguage: setLanguageWrapper,
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
