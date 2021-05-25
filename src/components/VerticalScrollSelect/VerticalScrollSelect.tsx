import React, { useRef, useEffect } from "react";
import type { UIEventHandler } from "react";

import { debounce } from "lodash";

import VerticalScrollSelectOption from "./VerticalScrollSelectOption";
import type { VerticalScrollSelectOptionProps } from "./VerticalScrollSelectOption";
import { BasicJSXProp } from "../../utils/types";
import "./VerticalScrollSelect.less";

interface VerticalScrollSelectOptionValue<T>
  extends VerticalScrollSelectOptionProps {
  value: T;
}

interface VerticalScrollSelectProp<T> extends BasicJSXProp {
  options: VerticalScrollSelectOptionValue<T>[];
  value: T;
  onSelect: (value: T) => void;
}

function VerticalScrollSelect<T>({
  options,
  value,
  onSelect,
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
        className="vertical-scroll-select no-scroll-bar"
        onScroll={onScroll}
        ref={containerRef}
      >
        {options.map((option, idx) => (
          <VerticalScrollSelectOption
            className={idx === selectedIdx ? "selected" : ""}
            key={idx.toString() + String(option.displayText)}
            displayText={option.displayText}
            icon={option.icon}
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
