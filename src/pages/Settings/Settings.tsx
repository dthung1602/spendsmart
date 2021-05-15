import React from "react";

import { CurrencySettings } from "../../parts";
import "./Settings.less";

function Settings(): JSX.Element {
  return (
    <div className="settings-page" style={{ color: "white" }}>
      <CurrencySettings />
    </div>
  );
}

export default Settings;
