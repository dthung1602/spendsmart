import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { GlobalContextProvider } from "./GlobalContext";
import { ErrorBoundary, FullScreenLoading } from "./components";

const NotFound = lazy(() => import("./pages/NotFound"));

function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <Router>
        <GlobalContextProvider>
          <Suspense fallback={<FullScreenLoading />}>
            <Switch>
              <Route path="*" component={NotFound} />
            </Switch>
          </Suspense>
        </GlobalContextProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
