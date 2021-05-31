import React, { useState, useEffect, MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";

import { notify } from "../../../components";
import { publish } from "../../../pubsub";
import { Transaction, transactionDataStore } from "../../../database";
import { formatMoney } from "../../../utils";
import { useTranslation } from "../../../utils/hooks";
import "./TransactionRow.less";

interface TransactionRowProps {
  transaction: Transaction;
}

function TransactionRow({ transaction }: TransactionRowProps): JSX.Element {
  const { t } = useTranslation();
  const [expand, setExpand] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    setDeleteConfirm(false);
  }, [expand]);

  const icon = transaction.categoriesIcons[0];

  const deleteTransaction: MouseEventHandler = (event) => {
    event.stopPropagation();
    if (deleteConfirm) {
      transactionDataStore
        .delete(transaction)
        .then(() => {
          publish("transaction-deleted", transaction);
        })
        .catch((e) => notify(String(e), "error"));
    } else {
      setDeleteConfirm(true);
    }
  };

  return (
    <div
      className="transaction-row small-text"
      onClick={() => setExpand(!expand)}
    >
      <div className={`transaction-body ${expand ? "expand" : ""}`}>
        <FontAwesomeIcon icon={icon} size="lg" className="transaction-icon" />
        <div className="transaction-category">
          {transaction.categoriesTitles[0]}
        </div>
        <div className="transaction-time">
          {format(transaction.spendDatetime, "Y-M-d")}
        </div>
        <div className="transaction-price">
          {formatMoney(transaction.price)}
        </div>
        {expand ? (
          <>
            <div className="transaction-note">{transaction.note}</div>
            <div className="transaction-expect">
              {transaction.isUnexpected ? "Unexpected" : "Expected"}
            </div>
          </>
        ) : null}
      </div>
      {expand ? (
        <div className="transaction-footer">
          <div className="btn-error" onClick={deleteTransaction}>
            <FontAwesomeIcon icon="trash" size="lg" className="h-margin-wide" />
            {deleteConfirm
              ? t("parts.transaction-row.delete-confirm")
              : t("common.delete")}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TransactionRow;
export type { TransactionRowProps };
