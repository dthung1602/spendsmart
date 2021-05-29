import React from "react";

import {
  BasicJSXPropWithChildren,
  ThemeableComponent,
  ThemeColor,
  ThemeTone,
} from "../../utils/types";
import "./Affix.less";

type AffixColor = ThemeColor;
type AffixTone = ThemeTone;

interface AffixProps extends BasicJSXPropWithChildren, ThemeableComponent {
  offsetTop: number;
}

function Affix({
  children,
  offsetTop = 0,
  theme = "dark",
  tone = "",
  className = "",
  style = {},
  onClick = undefined,
}: AffixProps): JSX.Element {
  style = { ...style, top: `${offsetTop}px` };
  return (
    <div
      className={`affix ${className} ${theme} ${tone}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Affix;
export type { AffixProps, AffixTone, AffixColor };
