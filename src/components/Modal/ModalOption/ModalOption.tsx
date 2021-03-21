import React from "react";

import "./ModalOption.less";

interface ModalOptionProps {
  children: React.ReactNode;
}

function ModalOption({ children }: ModalOptionProps): JSX.Element {
  return <div className="modal-option">{children}</div>;
}

export default ModalOption;
