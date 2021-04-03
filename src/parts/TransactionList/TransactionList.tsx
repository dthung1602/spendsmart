import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";

import { Transaction } from "../../database";
import TransactionRow from "./TransactionRow";
import "./TransactionList.less";

interface TransactionListProp {
  transactions: Transaction[];
}

function TransactionList({ transactions }: TransactionListProp): JSX.Element {
  return (
    <div className="transactions-list">
      <div className="sub-title">
        <FontAwesomeIcon
          icon={faHistory}
          className="transaction-icon h-margin-medium"
        />
        Recent transactions
      </div>
      {transactions.map((transaction) => {
        return (
          <TransactionRow transaction={transaction} key={transaction.id} />
        );
      })}
    </div>
  );
}

export default TransactionList;
