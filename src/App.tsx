import React, { lazy, Suspense, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { GlobalContextProvider } from "./GlobalContext";
import { initDB, localStorage } from "./database";
import { FullScreenLoading, ScrollToTop, notify } from "./components";
import { ErrorBoundary } from "./parts";
import { Navbar } from "./parts";
import {
  ROUTE_DASHBOARD,
  ROUTE_HOME,
  ROUTE_REPORTS,
  ROUTE_SETTINGS,
  ROUTE_TRANSACTIONS,
} from "./utils/constants";

const DashboardPage = lazy(() => import("./pages/Dashboard"));
const IntroTourPage = lazy(() => import("./pages/IntroTour"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
const ReportsPage = lazy(() => import("./pages/Reports"));
const SettingsPage = lazy(() => import("./pages/Settings"));
const TransactionsPage = lazy(() => import("./pages/Transactions"));

function App(): JSX.Element {
  const [introTourTaken, setIntroTourTaken] = useState<boolean>(
    localStorage.introTourTaken
  );

  const onFinishIntroTour = () => {
    initDB()
      .then(() => {
        localStorage.introTourTaken = true;
        setIntroTourTaken(true);
      })
      .catch((e) => notify(String(e), "error"));
  };

  useEffect(() => {
    if (introTourTaken) {
      initDB().catch((e) => notify(String(e), "error"));
    }
  });

  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <GlobalContextProvider>
          <Suspense fallback={<FullScreenLoading />}>
            {introTourTaken ? (
              <>
                <Switch>
                  <Route exact path={ROUTE_HOME}>
                    <Redirect to={ROUTE_DASHBOARD} />
                  </Route>
                  <Route
                    path={ROUTE_DASHBOARD}
                    exact
                    component={DashboardPage}
                  />
                  <Route
                    path={ROUTE_TRANSACTIONS}
                    component={TransactionsPage}
                  />
                  <Route path={ROUTE_REPORTS} component={ReportsPage} />
                  <Route path={ROUTE_SETTINGS} component={SettingsPage} />
                  <Route path="*" component={NotFoundPage} />
                </Switch>
                <Navbar />
              </>
            ) : (
              <IntroTourPage onFinishIntroTour={onFinishIntroTour} />
            )}
          </Suspense>
        </GlobalContextProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
