import React from "react";

import { BasicJSXProp } from "../../utils/types";
import "./Switch.less";

interface SwitchProps extends BasicJSXProp {
  checked: boolean;
}

function Switch({
  checked,
  style = {},
  className = "",
  onClick,
}: SwitchProps): JSX.Element {
  return (
    <div
      className={`switch ${checked ? "checked" : ""} ${className}`}
      style={style}
      onClick={onClick}
    >
      <div className="circle" />
    </div>
  );
}

export default Switch;
export type { SwitchProps };
