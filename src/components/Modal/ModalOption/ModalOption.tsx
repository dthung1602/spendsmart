import React, { ReactNode } from "react";

import "./ModalOption.less";

interface ModalOptionProps {
  children: ReactNode;
}

function ModalOption({ children }: ModalOptionProps): JSX.Element {
  return <div className="modal-option">{children}</div>;
}

export default ModalOption;
export type { ModalOptionProps };
