import React from "react";

import wipImage from "../../assets/images/wip.png";
import "./WorkInProgress.less";

function WorkInProgress(): JSX.Element {
  return (
    <div className="wip">
      <img src={wipImage} alt="Work in progress" />
    </div>
  );
}

export default WorkInProgress;
