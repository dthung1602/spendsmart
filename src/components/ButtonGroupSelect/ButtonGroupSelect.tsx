import React, { Key } from "react";

import Button, { ButtonSize } from "../Button";
import { Optional, ThemeableComponent } from "../../utils/types";
import "./ButtonGroupSelect.less";

interface ButtonGroupSelectOption<T extends Optional<Key>> {
  displayText: React.ReactNode;
  value: T;
}

interface ButtonGroupSelectProps<T extends Optional<Key>>
  extends ThemeableComponent {
  options: ButtonGroupSelectOption<T>[];
  value?: T;
  onSelect: (value: T) => void;
  size?: ButtonSize;
}

function ButtonGroupSelect<T extends Optional<Key>>({
  options,
  value,
  size = "medium",
  theme = "dark",
  tone = "",
  onSelect,
}: ButtonGroupSelectProps<T>): JSX.Element {
  return (
    <div className="button-group-select">
      {options.map((option) => (
        <Button
          key={option.value}
          size={size}
          theme={theme}
          tone={tone}
          className={`${option.value === value ? "selected" : ""}`}
          onClick={() => onSelect(option.value)}
        >
          {option.displayText}
        </Button>
      ))}
    </div>
  );
}

export default ButtonGroupSelect;
export type { ButtonGroupSelectProps, ButtonGroupSelectOption };
