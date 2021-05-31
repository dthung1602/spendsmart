import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

import { BasicJSXProp } from "../../../utils/types";
import "./HorizontalScrollSelectOption.less";

type HorizontalScrollSelectTextColor = "dark" | "light";

interface PropsWithIcon extends BasicJSXProp {
  icon: IconProp;
  displayText?: React.ReactNode;
  textColor?: HorizontalScrollSelectTextColor;
}

interface PropsWithText extends BasicJSXProp {
  icon?: IconProp;
  displayText: React.ReactNode;
  textColor?: HorizontalScrollSelectTextColor;
}

type HorizontalScrollSelectOptionProps = PropsWithIcon | PropsWithText;

function HorizontalScrollSelectOption({
  icon = undefined,
  displayText = undefined,
  onClick,
  textColor = "dark",
  className = "",
  style = {},
}: HorizontalScrollSelectOptionProps): JSX.Element {
  return (
    <div
      className={`horizontal-scroll-select-option v-padding-medium ${className} text-${textColor}`}
      style={style}
      onClick={onClick}
    >
      {icon && (
        <FontAwesomeIcon className="h-padding-wide" icon={icon} size="1x" />
      )}
      {displayText && <span>{displayText}</span>}
    </div>
  );
}

export default HorizontalScrollSelectOption;
export type {
  HorizontalScrollSelectOptionProps,
  HorizontalScrollSelectTextColor,
};
