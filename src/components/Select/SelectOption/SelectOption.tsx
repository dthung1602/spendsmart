import React from "react";

import "./SelectOption.less";

interface SelectOptionProps {
  children: React.ReactNode;
}

function SelectOption({ children }: SelectOptionProps): JSX.Element {
  return <div className="select-option">{children}</div>;
}

export default SelectOption;
