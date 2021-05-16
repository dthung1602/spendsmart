import React from "react";

import { BasicJSXPropWithChildren } from "../../utils/types";
import "./Affix.less";

type AffixType =
  | "primary"
  | "error"
  | "waring"
  | "info"
  | "success"
  | "default";

interface AffixProps extends BasicJSXPropWithChildren {
  offsetTop: number;
  type: AffixType;
}

function Affix({
  children,
  offsetTop = 0,
  type = "default",
  className = "",
  style = {},
  onClick = undefined,
}: AffixProps): JSX.Element {
  style = { ...style, top: `${offsetTop}px` };
  return (
    <div
      className={`affix ${className} ${type}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Affix;
export type { AffixProps, AffixType };
