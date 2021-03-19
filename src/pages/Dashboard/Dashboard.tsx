import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import FAB from "../../components/FAB";
import Modal from "../../components/Modal";
import "./Dashboard.less";

function Dashboard(): JSX.Element {
  return (
    <div className="dashboard-page">
      Dashboard
      <FAB modal={<Modal />} type="success" icon={faPlus} />
    </div>
  );
}

export default Dashboard;
