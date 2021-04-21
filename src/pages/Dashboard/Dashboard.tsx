import React, { useContext } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import {
  PageHeaderHighLight,
  NewTransactionModal,
  TransactionList,
} from "../../parts";
import { FAB, Tab } from "../../components";
import { GlobalContext } from "../../GlobalContext";
import { Transaction } from "../../database";
import "./Dashboard.less";

const mockTransactions: Transaction[] = [];

function Dashboard(): JSX.Element {
  const { overlayOpen, setOverlayOpen } = useContext(GlobalContext);

  return (
    <div className="dashboard-page">
      <PageHeaderHighLight thisWeek={1234567} thisMonth={12345678} />
      <Tab onTabChange={(tab) => console.log("tab clicked: ", tab)}>
        {Array(10)
          .fill(null)
          .map((v, i) => (
            <Tab.TabPane key={`tab${i}`} tab={`tab${i}`} title={`Tab ${i}`}>
              <div style={{ height: "200px" }}>
                {" "}
                This is the content of tab {i}
              </div>
            </Tab.TabPane>
          ))}
      </Tab>
      <TransactionList transactions={mockTransactions} />
      <FAB
        icon={faPlus}
        type="success"
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
