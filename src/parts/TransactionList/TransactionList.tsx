import React from "react";

import TransactionRow from "./TransactionRow";
import { Transaction } from "../../database";
import "./TransactionList.less";

interface TransactionListProps {
  transactions: Transaction[];
}

function TransactionList({ transactions }: TransactionListProps): JSX.Element {
  return (
    <div className="v-margin-huge">
      {transactions.map((transaction) => {
        return (
          <TransactionRow transaction={transaction} key={transaction.id} />
        );
      })}
    </div>
  );
}

TransactionList.TransactionRow = TransactionRow;

export default TransactionList;
export type { TransactionListProps };
