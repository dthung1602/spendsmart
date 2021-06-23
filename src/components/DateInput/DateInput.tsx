import React from "react";

import {
  BasicJSXProp,
  ThemeableComponent,
  ThemeColor,
  ThemeTone,
} from "../../utils/types";
import "./DateInput.less";

type DateInputColor = ThemeColor;
type DateInputTone = ThemeTone;

interface DateInputProps extends BasicJSXProp, ThemeableComponent {}

function DateInput({
  theme = "dark",
  tone = "",
  className = "",
  style = {},
}: DateInputProps): JSX.Element {
  return <></>;
}

export default DateInput;
export type { DateInputProps, DateInputTone, DateInputColor };
