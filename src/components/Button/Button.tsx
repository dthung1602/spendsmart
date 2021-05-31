import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

import type {
  BasicJSXPropWithChildren,
  ThemeableComponent,
} from "../../utils/types";
import "./Button.less";

type ButtonSize = "large" | "medium" | "small";

interface ButtonProps extends BasicJSXPropWithChildren, ThemeableComponent {
  icon?: IconProp;
  size?: ButtonSize;
  block?: boolean;
  round?: boolean;
}

const sizeToPadding = {
  large: "wide",
  medium: "medium",
  small: "narrow",
} as const;

function Button({
  icon = undefined,
  theme = "dark",
  tone = "",
  size = "medium",
  block = false,
  round = false,
  className = "",
  style = {},
  onClick = undefined,
  children,
}: ButtonProps): JSX.Element {
  let baseClassName = `button padding-${sizeToPadding[size]} ${size} ${theme} ${tone}`;
  if (block) {
    baseClassName += " block";
  }
  if (round) {
    baseClassName += " round";
  }
  className = baseClassName + " " + className;

  const iconElement = icon && (
    <FontAwesomeIcon
      icon={icon}
      className={`r-margin-${sizeToPadding[size]}`}
    />
  );

  return (
    <button className={className} style={style} onClick={onClick}>
      {iconElement}
      {children}
    </button>
  );
}

export default Button;
export type { ButtonProps, ButtonSize };
