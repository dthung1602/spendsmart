import React, { lazy, useEffect, Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { GlobalContextProvider } from "./GlobalContext";
import { initDB, localStorage } from "./database";
import { ErrorBoundary, FullScreenLoading } from "./components";
import Navbar from "./parts/Navbar";
import {
  ROUTE_DASHBOARD,
  ROUTE_HOME,
  ROUTE_REPORTS,
  ROUTE_SETTINGS,
  ROUTE_TRANSACTIONS,
} from "./utils/constants";

const DashboardPage = lazy(() => import("./pages/Dashboard"));
const HomePage = lazy(() => import("./pages/Home"));
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
      .catch((e) => alert(e));
  };

  return (
    <ErrorBoundary>
      <Router>
        <GlobalContextProvider>
          <Suspense fallback={<FullScreenLoading />}>
            {introTourTaken ? (
              <>
                <Switch>
                  <Route exact path={ROUTE_HOME} component={HomePage} />
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
