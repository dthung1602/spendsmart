import React, { useContext, useEffect } from "react";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GlobalContext } from "../../GlobalContext";
import SelectOption from "./SelectOption";
import "./Select.less";

interface SelectProp
  extends React.PropsWithChildren<{
    title: string;
    open: boolean;
    onClose: () => void;
  }> {}

function Select({ title, open, onClose, children }: SelectProp): JSX.Element {
  const updateContext = useContext(GlobalContext)[1];

  const close: React.MouseEventHandler = (event) => {
    event.stopPropagation();
    onClose();
  };

  useEffect(() => {
    updateContext({ overlayOpen: open });
  });

  return (
    <>
      <div
        className={`select-background ${open ? "open" : ""}`}
        onClick={close}
      />
      <div className="select-placeholder">
        <div className={`select-container ${open ? "open" : ""}`}>
          <div className="select-header">
            {title}
            <FontAwesomeIcon icon={faTimesCircle} size="1x" onClick={close} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

Select.Option = SelectOption;

export default Select;
