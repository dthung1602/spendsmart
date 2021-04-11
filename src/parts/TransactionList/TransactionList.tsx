import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";

import TransactionRow from "./TransactionRow";
import { Transaction } from "../../database";
import { useTranslation } from "../../utils/hooks";
import "./TransactionList.less";

interface TransactionListProps {
  transactions: Transaction[];
}

function TransactionList({ transactions }: TransactionListProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="transactions-list">
      <div className="sub-title">
        <FontAwesomeIcon
          icon={faHistory}
          className="transaction-icon h-margin-medium"
        />
        {t("parts.transaction-list.recent-transactions")}
      </div>
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
