import React, { ReactNode } from "react";

import { BasicJSXPropWithChildren } from "../../../utils/types";
import "./TabPane.less";

interface TabPaneProps extends BasicJSXPropWithChildren {
  tab: string;
  title: ReactNode;
}

function TabPane({
  children,
  className = "",
  style = {},
}: TabPaneProps): JSX.Element {
  return (
    <div className={`tab-pane ${className}`} style={style}>
      {children}
    </div>
  );
}

export default TabPane;
export type { TabPaneProps };
