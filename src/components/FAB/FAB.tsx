import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

import "./FAB.less";

type FABType = "success" | "info" | "warning" | "error" | "default";

interface FABProp {
  icon: IconProp;
  onClick: React.MouseEventHandler;
  type?: FABType;
  hide?: boolean;
}

function FAB({
  icon,
  onClick,
  type = "default",
  hide = false,
}: FABProp): JSX.Element {
  return (
    <div className={`fab ${type} ${hide ? "hide" : ""}`} onClick={onClick}>
      <FontAwesomeIcon icon={icon} size="1x" />
    </div>
  );
}

export default FAB;
