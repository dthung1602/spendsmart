import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

import "./VerticalScrollSelectOption.less";

interface VerticalScrollSelectOptionProp {
  icon: IconProp;
  displayText: string;
}

function VerticalScrollSelectOption({
  icon,
  displayText,
}: VerticalScrollSelectOptionProp): JSX.Element {
  return (
    <div className={`vertical-scroll-select-option v-padding-medium`}>
      <FontAwesomeIcon className="h-padding-wide" icon={icon} size="1x" />
      <span>{displayText}</span>
    </div>
  );
}

export default VerticalScrollSelectOption;
export type { VerticalScrollSelectOptionProp };
