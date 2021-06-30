import React, { useEffect } from "react";

import { notify } from "../../components";
import { TransactionFilter, TransactionList } from "../../parts";
import { useTransactionList, useTransactionFilter } from "../../utils/hooks";
import "./Transactions.less";
import { transactionDataStore } from "../../database";

const PAGE_SIZE = 12;

function Transactions(): JSX.Element {
  const [filter, setFilter, setPage] = useTransactionFilter(PAGE_SIZE);
  const [transactions, setTransactions] = useTransactionList();

  useEffect(() => {
    transactionDataStore
      .find(filter)
      .then(setTransactions)
      .catch((e) => notify(String(e), "error"));
  }, [filter]);

  return (
    <div className="page transactions-page">
      <TransactionFilter filter={filter} setFilter={setFilter} />
      <TransactionList transactions={transactions} />
    </div>
  );
}

export default Transactions;
