import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type {
  BasicJSXPropWithChildren,
  ThemeableComponent,
} from "../../utils/types";
import { IconName, iconMapping } from "../../utils";
import "./Button.less";

type ButtonSize = "large" | "medium" | "small";

interface ButtonProps extends BasicJSXPropWithChildren, ThemeableComponent {
  icon?: IconName;
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
  className += ` button padding-${sizeToPadding[size]} ${size} ${theme} ${tone}`;
  if (block) {
    className += " block";
  }
  if (round) {
    className += " round";
  }
  const iconElement = icon ? (
    <FontAwesomeIcon
      icon={iconMapping[icon]}
      className={`r-margin-${sizeToPadding[size]}`}
    />
  ) : undefined;

  return (
    <button className={className} style={style} onClick={onClick}>
      {iconElement}
      {children}
    </button>
  );
}

export default Button;
export type { ButtonProps, ButtonSize };
