import React from "react";

import { WorkInProgress } from "../../components";
import "./Transactions.less";

function Transactions(): JSX.Element {
  return (
    <div className="page transactions-page">
      <WorkInProgress />
    </div>
  );
}

export default Transactions;
