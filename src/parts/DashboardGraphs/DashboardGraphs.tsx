import React from "react";

import { Tab, WorkInProgress } from "../../components";
import "./DashboardGraphs.less";

function DashboardGraphs(): JSX.Element {
  return (
    <Tab>
      <Tab.TabPane tab="target" title="Target">
        <WorkInProgress />
      </Tab.TabPane>
    </Tab>
  );
}

export default DashboardGraphs;
