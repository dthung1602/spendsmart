import React, { useState } from "react";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";

import { Transaction } from "../../../database";
import { formatMoney, icons } from "../../../utils";

import "./TransactionRow.less";

type TransactionIconName = keyof typeof icons;

interface TransactionRowProps {
  transaction: Transaction;
}

function TransactionRow({ transaction }: TransactionRowProps): JSX.Element {
  const [expand, setExpand] = useState(false);

  const icon = icons[transaction.icon as TransactionIconName];

  return (
    <div className="transaction-row small" onClick={() => setExpand(!expand)}>
      <div className={`transaction-body ${expand ? "expand" : ""}`}>
        <FontAwesomeIcon icon={icon} size="lg" className="transaction-icon" />
        <div className="transaction-category">{transaction.leafCategory}</div>
        <div className="transaction-time">
          {format(transaction.spendDatetime, "Y-M-d")}
        </div>
        <div className="transaction-price">
          {formatMoney(transaction.price)}
        </div>
        {expand ? (
          <>
            <div className="transaction-title">{transaction.title}</div>
            <div className="transaction-expect">
              {transaction.isUnexpected ? "Unexpected" : "Expected"}
            </div>
          </>
        ) : null}
      </div>
      {expand ? (
        <div className="transaction-footer">
          <div className="btn-error">
            <FontAwesomeIcon
              icon={faTrash}
              size="lg"
              className="h-margin-wide"
            />
            Delete
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TransactionRow;
export type { TransactionRowProps, TransactionIconName };
