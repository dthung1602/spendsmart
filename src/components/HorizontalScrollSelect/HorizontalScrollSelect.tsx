import React, { useEffect, useRef, useState, Key } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import HorizontalScrollSelectOption from "./HorizontalScrollSelectOption";
import type {
  HorizontalScrollSelectOptionProps,
  HorizontalScrollSelectTextColor,
} from "./HorizontalScrollSelectOption";
import type { BasicJSXProp, Optional } from "../../utils/types";
import "./HorizontalScrollSelect.less";

interface ValueWithIcon<T extends Optional<Key>> {
  icon: IconProp;
  displayText?: React.ReactNode;
  value: T;
}

interface ValueWithText<T extends Optional<Key>> {
  icon?: IconProp;
  displayText: React.ReactNode;
  value: T;
}

type HorizontalScrollSelectOptionValue<T extends Optional<Key>> =
  | ValueWithIcon<T>
  | ValueWithText<T>;

interface HorizontalScrollSelectProp<T extends Optional<Key>>
  extends BasicJSXProp {
  options: HorizontalScrollSelectOptionValue<T>[];
  value: T;
  onSelect: (value: T) => void;
  textColor?: HorizontalScrollSelectTextColor;
}

function HorizontalScrollSelect<T extends Optional<Key>>({
  options,
  value,
  onSelect,
  textColor = "dark",
  className = "",
  style = {},
}: HorizontalScrollSelectProp<T>): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseLeave, setMouseLeave] = useState(true);

  useEffect(() => {
    if (containerRef.current) {
      const selected = containerRef.current.querySelector(".selected");
      if (selected && mouseLeave) {
        containerRef.current.scrollLeft =
          (selected as HTMLElement).offsetLeft -
          containerRef.current.offsetLeft;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div
      className={`horizontal-scroll-select-container padding-medium ${className}`}
      style={style}
      onMouseLeave={() => setMouseLeave(true)}
      onMouseEnter={() => setMouseLeave(false)}
      ref={containerRef}
    >
      {options.map((option) => (
        <HorizontalScrollSelectOption
          className={option.value === value ? "selected" : ""}
          key={option.value}
          displayText={option.displayText}
          icon={option.icon}
          textColor={textColor}
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
