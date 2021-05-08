import React, { useContext, useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { subWeeks } from "date-fns/fp";

import {
  PageHeaderHighLight,
  NewTransactionModal,
  TransactionList,
  DashboardGraphs,
} from "../../parts";
import { FAB, notify, Tab } from "../../components";
import { subscribe } from "../../pubsub";
import { GlobalContext } from "../../GlobalContext";
import { Transaction, transactionDataStore } from "../../database";
import "./Dashboard.less";

const subOneWeek = subWeeks(1);

function Dashboard(): JSX.Element {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { overlayOpen, setOverlayOpen } = useContext(GlobalContext);

  const loadRecentTransactions = () => {
    transactionDataStore
      .find({ spendDatetime: { $gte: subOneWeek(new Date()) } })
      .then((trans) => {
        setTransactions(trans);
      })
      .catch((e) => notify(String(e), "error"));
  };

  useEffect(loadRecentTransactions, []);

  useEffect(() => {
    const unsubscribe1 = subscribe("transaction-added", loadRecentTransactions);
    const unsubscribe2 = subscribe(
      "transaction-deleted",
      loadRecentTransactions
    );
    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  });

  return (
    <div className="dashboard-page">
      <PageHeaderHighLight thisWeek={1234567} thisMonth={12345678} />
      <DashboardGraphs />
      <TransactionList transactions={transactions} />
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
