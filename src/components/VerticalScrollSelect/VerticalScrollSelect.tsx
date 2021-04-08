import React, { useRef, useState } from "react";
import type { UIEventHandler } from "react";

import { debounce } from "lodash";

import type { VerticalScrollSelectOptionProp } from "./VerticalScrollSelectOption";
import VerticalScrollSelectOption from "./VerticalScrollSelectOption";
import { BasicJSXProp } from "../../utils/types";
import "./VerticalScrollSelect.less";

interface VerticalScrollSelectOptionValue<T>
  extends VerticalScrollSelectOptionProp {
  value: T;
}

interface VerticalScrollSelectProp<T> extends BasicJSXProp {
  options: VerticalScrollSelectOptionValue<T>[];
  defaultValue?: T;
  onSelect: (value: T) => void;
}

function VerticalScrollSelect<T>({
  options,
  defaultValue,
  onSelect,
}: VerticalScrollSelectProp<T>): JSX.Element {
  const defaultIdx = options.findIndex((opt) => opt.value === defaultValue);

  const [selectedIdx, setSelectedIndex] = useState<number>(
    Math.max(defaultIdx, 0)
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const onScroll: UIEventHandler<HTMLDivElement> = debounce((event) => {
    const optionHeight = event.target.children[0].getBoundingClientRect()
      .height;
    const newSelectIdx = Math.round(event.target.scrollTop / optionHeight);

    if (newSelectIdx != selectedIdx) {
      onSelect(options[newSelectIdx].value);
      setSelectedIndex(newSelectIdx);
    }

    event.target.scrollTo({
      top: newSelectIdx * optionHeight + 2,
      behavior: "smooth",
    });
  }, 200);

  return (
    <div
      className="vertical-scroll-select no-scroll-bar"
      onScroll={onScroll}
      ref={containerRef}
    >
      {options.map((option, idx) => (
        <VerticalScrollSelectOption
          className={idx === selectedIdx ? "selected" : ""}
          key={option.displayText}
          displayText={option.displayText}
          icon={option.icon}
          nested={option.nested}
        />
      ))}
    </div>
  );
}

export default VerticalScrollSelect;
