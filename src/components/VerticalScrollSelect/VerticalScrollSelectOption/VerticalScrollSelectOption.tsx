import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

import "./VerticalScrollSelectOption.less";
import { BasicJSXProp } from "../../../utils/types";

interface VerticalScrollSelectOptionProps extends BasicJSXProp {
  icon: IconProp;
  displayText: React.ReactNode;
  nested?: boolean;
}

function VerticalScrollSelectOption({
  icon,
  displayText,
  nested = false,
  className = "",
  style = {},
}: VerticalScrollSelectOptionProps): JSX.Element {
  return (
    <div
      className={`vertical-scroll-select-option v-padding-medium 
        ${nested ? "nested" : ""} ${className}`}
      style={style}
    >
      <FontAwesomeIcon className="h-padding-wide" icon={icon} size="1x" />
      <span>{displayText}</span>
    </div>
  );
}

export default VerticalScrollSelectOption;
export type { VerticalScrollSelectOptionProps };
