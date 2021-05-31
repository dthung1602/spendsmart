import React, { useRef, useEffect, UIEventHandler, Key } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { debounce } from "lodash";

import VerticalScrollSelectOption, {
  VerticalScrollSelectTextColor,
  VerticalScrollSelectOptionProps,
} from "./VerticalScrollSelectOption";
import { BasicJSXProp, Optional } from "../../utils/types";
import "./VerticalScrollSelect.less";

interface VerticalScrollSelectOptionValue<T extends Optional<Key>> {
  icon?: IconProp;
  displayText: React.ReactNode;
  nested?: boolean;
  value: T;
}

interface VerticalScrollSelectProp<T extends Optional<Key>>
  extends BasicJSXProp {
  options: VerticalScrollSelectOptionValue<T>[];
  textColor?: VerticalScrollSelectTextColor;
  value: T;
  onSelect: (value: T) => void;
}

function VerticalScrollSelect<T extends Optional<Key>>({
  options,
  value,
  onSelect,
  textColor = "dark",
  className = "",
  style = {},
}: VerticalScrollSelectProp<T>): JSX.Element {
  const selectedIdx = Math.max(
    options.findIndex((opt) => opt.value === value),
    0
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const onScroll: UIEventHandler<HTMLDivElement> = debounce((event) => {
    const optionHeight = event.target.children[0].getBoundingClientRect()
      .height;
    const newSelectIdx = Math.round(event.target.scrollTop / optionHeight);

    if (newSelectIdx != selectedIdx) {
      onSelect(options[newSelectIdx].value);
    }
  }, 200);

  useEffect(() => {
    if (containerRef.current?.children[0]) {
      const optionHeight = containerRef.current.children[0].getBoundingClientRect()
        .height;
      containerRef.current.scrollTo({
        top: selectedIdx * optionHeight,
        behavior: "smooth",
      });
    }
  }, [selectedIdx]);

  return (
    <div className="vertical-scroll-select-container">
      <div
        className={`vertical-scroll-select no-scroll-bar ${className}`}
        style={style}
        onScroll={onScroll}
        ref={containerRef}
      >
        {options.map((option, idx) => (
          <VerticalScrollSelectOption
            className={idx === selectedIdx ? "selected" : ""}
            key={option.value}
            displayText={option.displayText}
            icon={option.icon}
            textColor={textColor}
            nested={option.nested}
          />
        ))}
      </div>
      <div className="vertical-scroll-select-highlight" />
    </div>
  );
}

export default VerticalScrollSelect;
export type {
  VerticalScrollSelectOptionProps,
  VerticalScrollSelectOptionValue,
};
