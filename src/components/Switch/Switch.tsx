import React from "react";

import "./Switch.less";
import { BasicJSXProp } from "../../utils/types";

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
