import React, { useState } from "react";
import "./ButtonSelect.less";

type ButtonSelectType = "primary" | "info" | "success" | "warning" | "error";

type ValueType = string | number;

interface ButtonOption<T extends ValueType> {
  displayText: React.ReactNode;
  value: T;
}

interface ButtonSelectProps<T extends ValueType> {
  type: ButtonSelectType;
  options: ButtonOption<T>[];
  defaultValue?: T;
  onSelect: (value: T) => void;
}

function ButtonSelect<T extends ValueType>({
  options,
  defaultValue,
  type,
  onSelect,
}: ButtonSelectProps<T>): JSX.Element {
  defaultValue = defaultValue || options[0].value;
  const [selected, setSelected] = useState<T>(defaultValue);

  return (
    <div className="button-select">
      {options.map((option) => (
        <div
          key={option.value}
          className={`btn-${type} ${
            option.value === selected ? "selected" : ""
          }`}
          onClick={() => {
            onSelect(option.value);
            setSelected(option.value);
          }}
        >
          {option.displayText}
        </div>
      ))}
    </div>
  );
}

export default ButtonSelect;
export type { ButtonSelectProps };
