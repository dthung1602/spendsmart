import React, { useState } from "react";

import TabPane, { TabPaneProp } from "./TabPane";
import "./Tab.less";

interface TabProp {
  onTabChange: (tab: string) => void;
  children: React.ReactElement<TabPaneProp>[];
  defaultSelectedTab?: string;
}

function Tab({
  onTabChange,
  children,
  defaultSelectedTab,
}: TabProp): JSX.Element {
  defaultSelectedTab = defaultSelectedTab || (children[0].props.tab as string);
  const [selectedTab, setSelectedTab] = useState(defaultSelectedTab);

  const tabToDisplay = children.find((tab) => tab.props.tab === selectedTab);

  return (
    <div className="tab">
      <div className="tab-header">
        {children.map((tab) => {
          const onClick = () => {
            setSelectedTab(tab.props.tab);
            onTabChange(tab.props.tab);
          };
          return (
            <div
              key={tab.props.tab}
              className={`tab-header-pane ${
                tab.props.tab === selectedTab ? "selected" : ""
              }`}
              onClick={onClick}
            >
              {tab.props.title}
            </div>
          );
        })}
      </div>
      <div className="tab-body">{tabToDisplay}</div>
    </div>
  );
}

Tab.TabPane = TabPane;

export default Tab;
