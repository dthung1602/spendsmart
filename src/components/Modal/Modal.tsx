import React, { useEffect } from "react";

import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalOption from "./ModalOption";
import "./Modal.less";

interface ModalProp
  extends React.PropsWithChildren<{
    title: string;
    open: boolean;
    onClose: () => void;
  }> {}

function Modal({ title, open, onClose, children }: ModalProp): JSX.Element {
  const close: React.MouseEventHandler = (event) => {
    event.stopPropagation();
    onClose();
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }
  });

  return (
    <>
      <div
        className={`modal-background ${open ? "open" : ""}`}
        onClick={close}
      />
      <div className={`modal-placeholder ${open ? "open" : ""}`}>
        <div className="modal-container">
          <div className="modal-header">
            <span className="sub-title">{title}</span>
            <FontAwesomeIcon icon={faTimesCircle} size="1x" onClick={close} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

Modal.Option = ModalOption;

export default Modal;
