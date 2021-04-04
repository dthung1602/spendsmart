import React, { createContext, useState } from "react";

import type { Language } from "./utils/types";

type GlobalContextState = {
  language: Language;
  overlayOpen: boolean;
};

const initContextState: GlobalContextState = {
  language: "en",
  overlayOpen: false,
};

interface GlobalContextProp {
  children: JSX.Element;
}

const defaultContextValue = [
  initContextState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  (s: Partial<GlobalContextState>): void => {},
] as const;

const GlobalContext = createContext(defaultContextValue);

function GlobalContextProvider(props: GlobalContextProp): JSX.Element {
  const [state, setState] = useState<GlobalContextState>(initContextState);

  const updateState = (newState: Partial<GlobalContextState>): void => {
    setState({
      ...state,
      ...newState,
    });
  };

  return (
    <GlobalContext.Provider value={[state, updateState]}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalContextProvider };
