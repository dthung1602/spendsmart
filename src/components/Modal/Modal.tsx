import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { BasicJSXPropWithChildren } from "../../utils/types";
import "./Modal.less";

interface ModalProps extends BasicJSXPropWithChildren {
  title: string;
  open: boolean;
  onClose: () => void;
  footer: React.ReactNode;
}

function Modal({
  title,
  open,
  onClose,
  footer,
  children,
  className = "",
  style = {},
}: ModalProps): JSX.Element {
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
        <div className={`modal-container light ${className}`} style={style}>
          <div className="modal-header">
            <span className="sub-title">{title}</span>
            <FontAwesomeIcon icon="times-circle" size="1x" onClick={close} />
          </div>
          <div className="modal-body v-padding-large h-padding-huge">
            {children}
          </div>
          <div className="modal-footer">{footer}</div>
        </div>
      </div>
    </>
  );
}

export default Modal;
export type { ModalProps };
