import React, { useEffect } from "react";

import "./Switch.less";
import { BasicJSXProp } from "../../utils/types";

interface SwitchProp extends BasicJSXProp {
  checked: boolean;
}

function Switch({ checked, onClick }: SwitchProp): JSX.Element {
  return (
    <div className={`switch ${checked ? "checked" : ""}`} onClick={onClick}>
      <div className="circle" />
    </div>
  );
}

export default Switch;
