import React, {
  useState,
  useEffect,
  useContext,
  MouseEventHandler,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";

import { notify, Button } from "../../../components";
import Money from "../../Money";
import { Transaction, transactionDataStore } from "../../../database";
import { GlobalContext } from "../../../GlobalContext";
import { useTranslation } from "../../../utils/hooks";
import "./TransactionRow.less";

interface TransactionRowProps {
  transaction: Transaction;
}

function TransactionRow({ transaction }: TransactionRowProps): JSX.Element {
  const { t } = useTranslation();
  const [expand, setExpand] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const { emitTransactionChange } = useContext(GlobalContext);

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
          emitTransactionChange({ type: "delete", transaction });
        })
        .catch((e) => notify(String(e), "error"));
    } else {
      setDeleteConfirm(true);
    }
  };

  return (
    <div
      className="transaction-row small-text dark lighter text-light"
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
          <Money value={transaction.price} />
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
          <Button
            theme="error"
            block={true}
            corner="square"
            onClick={deleteTransaction}
          >
            <FontAwesomeIcon icon="trash" size="lg" className="h-margin-wide" />
            {deleteConfirm
              ? t("parts.transaction-row.delete-confirm")
              : t("common.delete")}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default TransactionRow;
export type { TransactionRowProps };
