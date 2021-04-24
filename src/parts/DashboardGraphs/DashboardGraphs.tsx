import React from "react";
import "./DashboardGraphs.less";
import { Tab, WorkInProgress } from "../../components";

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
