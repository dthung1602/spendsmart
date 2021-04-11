import React, { useState, ReactElement } from "react";

import TabPane, { TabPaneProps } from "./TabPane";
import "./Tab.less";

interface TabProps {
  onTabChange: (tab: string) => void;
  children: ReactElement<TabPaneProps>[];
  defaultSelectedTab?: string;
}

function Tab({
  onTabChange,
  children,
  defaultSelectedTab,
}: TabProps): JSX.Element {
  defaultSelectedTab = defaultSelectedTab || (children[0].props.tab as string);
  const [selectedTab, setSelectedTab] = useState(defaultSelectedTab);

  const tabToDisplay = children.find((tab) => tab.props.tab === selectedTab);

  return (
    <div className="tab">
      <div className="tab-header no-scroll-bar">
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
export type { TabProps };
