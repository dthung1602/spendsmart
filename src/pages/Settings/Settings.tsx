import React from "react";

import { GeneralSettings, CategorySettings } from "../../parts";
import "./Settings.less";

function Settings(): JSX.Element {
  return (
    <div className="settings-page">
      <GeneralSettings />
      <CategorySettings />
    </div>
  );
}

export default Settings;
