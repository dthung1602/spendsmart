import React, { useEffect, useState } from "react";

import { notify } from "../../components";
import { TransactionFilter, TransactionList } from "../../parts";
import { useTransactionList, useTransactionFilter } from "../../utils/hooks";
import { transactionDataStore } from "../../database";
import "./Transactions.less";

const PAGE_SIZE = 12;

function Transactions(): JSX.Element {
  const { filter, query, setQuery, page, setPage } = useTransactionFilter(
    PAGE_SIZE
  );
  const [allFetched, setAllFetched] = useState(false);
  const [transactions, setTransactions] = useTransactionList();

  useEffect(() => {
    transactionDataStore
      .find(filter)
      .then((newTrans) => {
        setTransactions((oldTrans) => {
          return page == 0 ? newTrans : [...oldTrans, ...newTrans];
        });
        setAllFetched(newTrans.length < PAGE_SIZE);
      })
      .catch((e) => notify(String(e), "error"));
  }, [filter, page, setTransactions]);

  const incPage = allFetched ? undefined : () => setPage(page + 1);

  return (
    <div className="page transactions-page">
      <TransactionFilter filter={query} setFilter={setQuery} />
      <TransactionList transactions={transactions} onEndReached={incPage} />
    </div>
  );
}

export default Transactions;
