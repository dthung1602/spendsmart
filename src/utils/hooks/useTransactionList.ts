import { useContext, useState, useEffect } from "react";

import { Transaction } from "../../database";
import { GlobalContext } from "../../GlobalContext";

function useTransactionList(): [Transaction[], (trs: Transaction[]) => void] {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { changedTransaction } = useContext(GlobalContext);

  useEffect(() => {
    if (changedTransaction) {
      const { type, transaction } = changedTransaction;
      if (type === "delete") {
        setTransactions((transactions) =>
          transactions.filter((tr) => tr.id !== transaction.id)
        );
      } else {
        setTransactions((transactions) => [transaction, ...transactions]);
      }
    }
  }, [changedTransaction]);

  return [transactions, setTransactions];
}

export default useTransactionList;
