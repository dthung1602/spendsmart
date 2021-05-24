import React from "react";

import type { HorizontalScrollSelectOptionProps } from "./HorizontalScrollSelectOption";
import HorizontalScrollSelectOption from "./HorizontalScrollSelectOption";
import { BasicJSXProp } from "../../utils/types";
import "./HorizontalScrollSelect.less";

interface HorizontalScrollSelectOptionValue<T>
  extends HorizontalScrollSelectOptionProps {
  value: T;
}

interface HorizontalScrollSelectProp<T> extends BasicJSXProp {
  options: HorizontalScrollSelectOptionValue<T>[];
  value: T;
  onSelect: (value: T) => void;
}

function HorizontalScrollSelect<T>({
  options,
  value,
  onSelect,
}: HorizontalScrollSelectProp<T>): JSX.Element {
  return (
    <div className="horizontal-scroll-select-container padding-large">
      {options.map((option, idx) => (
        <HorizontalScrollSelectOption
          className={option.value === value ? "selected" : ""}
          key={idx.toString() + String(option.displayText)}
          displayText={option.displayText}
          icon={option.icon}
          onClick={() => {
            onSelect(option.value);
          }}
        />
      ))}
    </div>
  );
}

export default HorizontalScrollSelect;
export type {
  HorizontalScrollSelectOptionProps,
  HorizontalScrollSelectOptionValue,
};
