import React, { useState, useEffect, useContext } from "react";

import { notify } from "../../components";
import { TransactionFilter, TransactionList } from "../../parts";
import { GlobalContext } from "../../GlobalContext";
import {
  Transaction,
  FilterObject,
  transactionDataStore,
} from "../../database";
import "./Transactions.less";

function Transactions(): JSX.Element {
  const [filter, setFilter] = useState<FilterObject<Transaction>>({});
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { changedTransaction } = useContext(GlobalContext);

  useEffect(() => {
    transactionDataStore
      .find(filter)
      .then(setTransactions)
      .catch((e) => notify(String(e), "error"));
  }, [filter, changedTransaction]);

  return (
    <div className="page transactions-page">
      <TransactionFilter filter={filter} setFilter={setFilter} />
      <TransactionList transactions={transactions} />
    </div>
  );
}

export default Transactions;
