import React, { MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

import type { ThemeColor, BasicJSXProp } from "../../utils/types";
import "./FAB.less";

type FABTheme = ThemeColor;

interface FABProps extends BasicJSXProp {
  icon: IconProp;
  onClick: MouseEventHandler;
  theme?: FABTheme;
  hide?: boolean;
}

function FAB({
  icon,
  onClick,
  theme = "dark",
  hide = false,
  className = "",
  style = {},
}: FABProps): JSX.Element {
  return (
    <button
      className={`fab ${theme} ${hide ? "hide" : ""} ${className}`}
      style={style}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} size="1x" />
    </button>
  );
}

export default FAB;
export type { FABProps, FABTheme };
