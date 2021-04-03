import React from "react";
import { Transaction } from "../../database";

import TransactionRow from "./TransactionRow";
import "./TransactionList.less";

interface TransactionListProp {
  transactions: Transaction[];
}

function TransactionList({ transactions }: TransactionListProp): JSX.Element {
  return (
    <div className="transactions-list">
      <div className="sub-title">Recent transactions</div>
      {transactions.map((transaction) => {
        return (
          <TransactionRow transaction={transaction} key={transaction.id} />
        );
      })}
    </div>
  );
}

export default TransactionList;
