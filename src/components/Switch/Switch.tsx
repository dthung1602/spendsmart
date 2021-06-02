import React from "react";

import { BasicJSXProp, ThemeColor } from "../../utils/types";
import "./Switch.less";

type SwitchTheme = ThemeColor;

interface SwitchProps extends BasicJSXProp {
  theme: SwitchTheme;
  checked: boolean;
}

function Switch({
  checked,
  theme = "dark",
  style = {},
  className = "",
  onClick,
}: SwitchProps): JSX.Element {
  console.log(">> ", checked);
  return (
    <div
      className={`switch ${
        checked ? "checked" : "unchecked"
      } ${theme} ${className}`}
      style={style}
      onClick={onClick}
    >
      <div className="circle" />
    </div>
  );
}

export default Switch;
export type { SwitchProps, SwitchTheme };
