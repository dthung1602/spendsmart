import React, { useContext, useEffect, useState } from "react";
import { startOfWeek, startOfMonth, subWeeks } from "date-fns/fp";

import { FAB, notify } from "../../components";
import {
  PageHeaderHighLight,
  NewTransactionModal,
  TransactionList,
  DashboardGraphs,
} from "../../parts";
import { subscribe } from "../../pubsub";
import { GlobalContext } from "../../GlobalContext";
import { Transaction, transactionDataStore } from "../../database";
import "./Dashboard.less";

const subOneWeek = subWeeks(1);

function Dashboard(): JSX.Element {
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );
  const [thisWeekSum, setThisWeekSum] = useState(NaN);
  const [thisMonthSum, setThisMonthSum] = useState(NaN);
  const { overlayOpen, setOverlayOpen } = useContext(GlobalContext);

  const now = new Date();

  const loadRecentTransactions = () => {
    transactionDataStore
      .find({ spendDatetime: { $gte: subOneWeek(now) } })
      .then((trans) => {
        setRecentTransactions(trans);
      })
      .catch((e) => notify(String(e), "error"));
  };

  const loadSummary = () => {
    transactionDataStore
      .find({ spendDatetime: { $gte: startOfWeek(now) } })
      .then((trans) => {
        setThisWeekSum(
          trans.map((t) => t.price).reduce((acc, val) => acc + val, 0)
        );
      })
      .catch((e) => notify(String(e), "error"));
    transactionDataStore
      .find({ spendDatetime: { $gte: startOfMonth(now) } })
      .then((trans) => {
        setThisMonthSum(
          trans.map((t) => t.price).reduce((acc, val) => acc + val, 0)
        );
      })
      .catch((e) => notify(String(e), "error"));
  };

  const refreshData = () => {
    loadRecentTransactions();
    loadSummary();
  };

  useEffect(refreshData, []);

  useEffect(() => {
    const unsubscribe1 = subscribe("transaction-added", refreshData);
    const unsubscribe2 = subscribe("transaction-deleted", refreshData);
    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  });

  return (
    <div className="page dashboard-page">
      <PageHeaderHighLight thisWeek={thisWeekSum} thisMonth={thisMonthSum} />
      <DashboardGraphs />
      <TransactionList transactions={recentTransactions} />
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
