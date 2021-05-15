import React, { useState } from "react";
import "./ButtonSelect.less";

type ButtonSelectType = "primary" | "info" | "success" | "warning" | "error";

interface ButtonSelectProps<T extends string> {
  type: ButtonSelectType;
  options: T[];
  defaultValue?: T;
  onSelect: (value: T) => void;
}

function ButtonSelect<T extends string>({
  options,
  defaultValue,
  type,
  onSelect,
}: ButtonSelectProps<T>): JSX.Element {
  defaultValue = defaultValue || options[0];
  const [selected, setSelected] = useState<T>(defaultValue);

  return (
    <div className="button-select">
      {options.map((option) => (
        <div
          key={option}
          className={`btn-${type} ${option === selected ? "selected" : ""}`}
          onClick={() => {
            onSelect(option);
            setSelected(option);
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
}

export default ButtonSelect;
export type { ButtonSelectProps };
