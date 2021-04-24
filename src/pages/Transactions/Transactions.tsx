import React from "react";

import "./Transactions.less";
import { WorkInProgress } from "../../components";

function Transactions(): JSX.Element {
  return (
    <div className="transactions-page">
      <WorkInProgress />
    </div>
  );
}

export default Transactions;
