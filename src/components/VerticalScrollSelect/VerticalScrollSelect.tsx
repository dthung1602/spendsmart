import React, { useRef } from "react";
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

  const selectedIdxRef = useRef<number>(Math.min(defaultIdx, 0));
  const containerRef = useRef<HTMLDivElement>(null);

  const onScroll: UIEventHandler<HTMLDivElement> = debounce((event) => {
    const blurHeight = event.target.children[0].getBoundingClientRect().height;
    const optionHeight =
      (event.target.scrollHeight - 2 * blurHeight) / options.length;
    const newSelectIdx = Math.round(event.target.scrollTop / optionHeight);
    if (newSelectIdx != selectedIdxRef.current) {
      onSelect(options[newSelectIdx].value);
      selectedIdxRef.current = newSelectIdx;
      containerRef.current
        ?.querySelectorAll(".vertical-scroll-select-option")
        .forEach((ele, i) => {
          if (i === newSelectIdx) {
            ele.classList.add("selected");
          } else {
            ele.classList.remove("selected");
          }
        });
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
      {options.map((option) => (
        <VerticalScrollSelectOption
          key={option.displayText}
          displayText={option.displayText}
          icon={option.icon}
        />
      ))}
    </div>
  );
}

export default VerticalScrollSelect;
