import React, { useRef } from "react";
import type { UIEventHandler } from "react";

import { debounce } from "lodash";

import type { VerticalScrollSelectOptionProp } from "./VerticalScrollSelectOption";
import VerticalScrollSelectOption from "./VerticalScrollSelectOption";
import "./VerticalScrollSelect.less";

interface VerticalScrollSelectOptionValue<T>
  extends VerticalScrollSelectOptionProp {
  value: T;
}

interface VerticalScrollSelectProp<T> {
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

  const onScroll: UIEventHandler<HTMLDivElement> = debounce((event) => {
    const blurHeight = event.target.children[0].getBoundingClientRect().height;
    const optionHeight =
      (event.target.scrollHeight - 2 * blurHeight) / options.length;
    const newSelectIdx = Math.round(event.target.scrollTop / optionHeight);
    if (newSelectIdx != selectedIdxRef.current) {
      onSelect(options[newSelectIdx].value);
      selectedIdxRef.current = newSelectIdx;
    }
    event.target.scrollTo({
      top: newSelectIdx * optionHeight,
      behavior: "smooth",
    });
  }, 250);

  return (
    <div className="vertical-scroll-select">
      <div className="blur" />
      <div className="body no-scroll-bar" onScroll={onScroll}>
        <div className="place-holder" />
        {options.map((option) => (
          <VerticalScrollSelectOption
            key={option.displayText}
            displayText={option.displayText}
            icon={option.icon}
          />
        ))}
        <div className="place-holder" />
      </div>
      <div className="blur" />
    </div>
  );
}

export default VerticalScrollSelect;
