import React from "react";

import "./TabPane.less";

interface TabPaneProp {
  tab: string;
  title: React.ReactNode;
  children: React.ReactNode;
}

function TabPane({ children }: TabPaneProp): JSX.Element {
  return <div className="tab-pane">{children}</div>;
}

export default TabPane;

export type { TabPaneProp };
