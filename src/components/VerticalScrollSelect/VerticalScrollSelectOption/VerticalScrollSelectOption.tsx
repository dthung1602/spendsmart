import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

import { BasicJSXProp } from "../../../utils/types";
import "./VerticalScrollSelectOption.less";

type VerticalScrollSelectTextColor = "dark" | "light";

interface VerticalScrollSelectOptionProps extends BasicJSXProp {
  icon?: IconProp;
  displayText: React.ReactNode;
  nested?: boolean;
  textColor?: VerticalScrollSelectTextColor;
}

function VerticalScrollSelectOption({
  icon,
  displayText,
  textColor = "dark",
  nested = false,
  className = "",
  style = {},
}: VerticalScrollSelectOptionProps): JSX.Element {
  return (
    <div
      className={`vertical-scroll-select-option v-padding-medium text-${textColor}
        ${nested ? "nested" : ""} ${className}`}
      style={style}
    >
      {icon && (
        <FontAwesomeIcon className="h-padding-wide" icon={icon} size="1x" />
      )}
      <span>{displayText}</span>
    </div>
  );
}

export default VerticalScrollSelectOption;
export type { VerticalScrollSelectOptionProps, VerticalScrollSelectTextColor };
