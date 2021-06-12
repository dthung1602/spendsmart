import React, { useContext } from "react";

import { FAB } from "../../components";
import {
  NewTransactionModal,
  PageHeaderHighLight,
  RecentTransactions,
} from "../../parts";
import { GlobalContext } from "../../GlobalContext";
import "./Dashboard.less";

function Dashboard(): JSX.Element {
  const { overlayOpen, setOverlayOpen } = useContext(GlobalContext);

  return (
    <div className="page dashboard-page">
      <PageHeaderHighLight />
      <RecentTransactions />
      <FAB
        icon="plus"
        theme="success"
        hide={overlayOpen}
        onClick={() => setOverlayOpen(true)}
      />
      <NewTransactionModal
        open={overlayOpen}
        onClose={() => setOverlayOpen(false)}
      />
    </div>
  );
}

export default Dashboard;
