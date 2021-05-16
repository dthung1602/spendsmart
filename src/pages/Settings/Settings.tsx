import React from "react";

import { GeneralSettings } from "../../parts";
import "./Settings.less";

function Settings(): JSX.Element {
  return (
    <div className="settings-page" style={{ color: "white" }}>
      <GeneralSettings />
    </div>
  );
}

export default Settings;
