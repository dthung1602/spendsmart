import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { GlobalContextProvider } from "./GlobalContext";
import { ErrorBoundary, FullScreenLoading } from "./components";
import Navbar from "./parts/Navbar";
import {
  ROUTE_HOME,
  ROUTE_DASHBOARD,
  ROUTE_SETTINGS,
  ROUTE_REPORTS,
  ROUTE_TRANSACTIONS,
} from "./utils/constants";

const DashboardPage = lazy(() => import("./pages/Dashboard"));
const HomePage = lazy(() => import("./pages/Home"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
const ReportsPage = lazy(() => import("./pages/Reports"));
const SettingsPage = lazy(() => import("./pages/Settings"));
const TransactionsPage = lazy(() => import("./pages/Transactions"));

function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <Router>
        <GlobalContextProvider>
          <>
            <Suspense fallback={<FullScreenLoading />}>
              <Switch>
                <Route exact path={ROUTE_HOME} component={HomePage} />
                <Route path={ROUTE_DASHBOARD} exact component={DashboardPage} />
                <Route path={ROUTE_TRANSACTIONS} component={TransactionsPage} />
                <Route path={ROUTE_REPORTS} component={ReportsPage} />
                <Route path={ROUTE_SETTINGS} component={SettingsPage} />
                <Route path="*" component={NotFoundPage} />
              </Switch>
            </Suspense>
            <Navbar />
          </>
        </GlobalContextProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
