import React, { useEffect } from "react";

import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

import ModalOption from "./ModalOption";
import type { BasicJSXPropWithChildren } from "../../utils/types";
import "./Modal.less";

type ModalButtonType = "success" | "info" | "warning" | "error" | "default";

interface ModalButton {
  displayText?: string;
  icon?: IconProp;
  type?: ModalButtonType;
  onClick: () => void;
}

interface ModalProps extends BasicJSXPropWithChildren {
  title: string;
  open: boolean;
  onClose: () => void;
  buttons?: ModalButton[];
}

function Modal({
  title,
  open,
  onClose,
  buttons,
  children,
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

  const footer = !buttons ? null : (
    <div className="modal-footer">
      {buttons.map(({ icon, displayText, onClick, type = "default" }, i) => (
        <div key={i} onClick={onClick} className={`btn-${type}`}>
          {icon ? (
            <FontAwesomeIcon className="r-margin-wide" size="lg" icon={icon} />
          ) : null}
          {displayText}
        </div>
      ))}
    </div>
  );

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
          <div className="modal-body v-padding-medium h-padding-huge">
            {children}
          </div>
          {footer}
        </div>
      </div>
    </>
  );
}

Modal.Option = ModalOption;

export default Modal;
export type { ModalProps, ModalButton, ModalButtonType };
