import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

import { BasicJSXProp } from "../../../utils/types";
import "./HorizontalScrollSelectOption.less";

interface HorizontalScrollSelectOptionProps extends BasicJSXProp {
  icon: IconProp;
  displayText?: React.ReactNode;
}

function HorizontalScrollSelectOption({
  icon,
  onClick,
  displayText = undefined,
  className = "",
  style = {},
}: HorizontalScrollSelectOptionProps): JSX.Element {
  return (
    <div
      className={`horizontal-scroll-select-option v-padding-medium ${className}`}
      style={style}
      onClick={onClick}
    >
      <FontAwesomeIcon className="h-padding-wide" icon={icon} size="1x" />
      {displayText ? <span>{displayText}</span> : undefined}
    </div>
  );
}

export default HorizontalScrollSelectOption;
export type { HorizontalScrollSelectOptionProps };
