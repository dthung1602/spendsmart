import React from "react";

import { EndOfList } from "../../components";
import TransactionRow from "./TransactionRow";
import { Transaction } from "../../database";
import "./TransactionList.less";

interface TransactionListProps {
  transactions: Transaction[];
  onEndReached?: () => void;
}

function TransactionList({
  transactions,
  onEndReached,
}: TransactionListProps): JSX.Element {
  return (
    <div className="v-margin-huge">
      {transactions.map((transaction) => {
        return (
          <TransactionRow transaction={transaction} key={transaction.id} />
        );
      })}
      <EndOfList
        onReached={onEndReached}
        disabled={!onEndReached}
        yOffset={0}
      />
    </div>
  );
}

TransactionList.TransactionRow = TransactionRow;

export default TransactionList;
export type { TransactionListProps };
