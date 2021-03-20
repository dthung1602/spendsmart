import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

import { GlobalContext } from "../../GlobalContext";
import "./FAB.less";

type FABType = "success" | "info" | "warning" | "error" | "default";

interface FABProp {
  icon: IconProp;
  onClick: React.MouseEventHandler;
  type?: FABType;
}

function FAB({ icon, onClick, type = "default" }: FABProp): JSX.Element {
  const [{ overlayOpen }] = useContext(GlobalContext);

  return (
    <div
      className={`fab ${type} ${overlayOpen ? "hide" : ""}`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} size="1x" />
    </div>
  );
}

export default FAB;
