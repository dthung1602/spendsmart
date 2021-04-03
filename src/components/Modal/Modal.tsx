import React, { useContext, useEffect } from "react";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GlobalContext } from "../../GlobalContext";
import ModalOption from "./ModalOption";
import "./Modal.less";

interface ModalProp
  extends React.PropsWithChildren<{
    title: string;
    open: boolean;
    onClose: () => void;
  }> {}

function Modal({ title, open, onClose, children }: ModalProp): JSX.Element {
  const updateContext = useContext(GlobalContext)[1];

  const close: React.MouseEventHandler = (event) => {
    event.stopPropagation();
    onClose();
  };

  // FIXME
  useEffect(() => {
    updateContext({ overlayOpen: open });
    if (open) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }
  }, [open]);

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
