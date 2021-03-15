import React, { createContext, useState } from "react";

const initContext = {};

type GlobalContextState = typeof initContext;

interface GlobalContextProp {
  children: JSX.Element;
}

const GlobalContext = createContext([
  initContext,
  (s: GlobalContextState) => s,
]);

function GlobalContextProvider(props: GlobalContextProp): JSX.Element {
  const [state, setState] = useState<GlobalContextState>(initContext);

  const updateState = (newState: GlobalContextState) => {
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
