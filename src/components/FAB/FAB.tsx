import React from "react";

import "./FAB.less";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
type FABType = "success" | "info" | "warning" | "error" | "default";

interface FABProp {
  modal: React.ReactNode;
  icon: IconProp;
  type?: FABType;
}

function FAB({ modal, icon, type = "default" }: FABProp): JSX.Element {
  return (
    <div className={`fab ${type}`}>
      <FontAwesomeIcon icon={icon} size="1x" />
    </div>
  );
}

export default FAB;
