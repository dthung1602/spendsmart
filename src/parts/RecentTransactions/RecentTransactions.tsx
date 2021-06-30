import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { subWeeks } from "date-fns/fp";

import TransactionList from "../TransactionList";
import { notify } from "../../components";
import { transactionDataStore } from "../../database";
import { useTransactionList, useTranslation } from "../../utils/hooks";
import "./RecentTransactions.less";

const subOneWeek = subWeeks(1);

function RecentTransactions(): JSX.Element {
  const { t } = useTranslation();
  const [recentTransactions, setRecentTransactions] = useTransactionList();

  useEffect(() => {
    transactionDataStore
      .find({ spendDatetime: { $gte: subOneWeek(new Date()) } })
      .then(setRecentTransactions)
      .catch((e) => notify(String(e), "error"));
  }, []);

  return (
    <>
      <div className="sub-title v-margin-large h-margin-medium text-light">
        <FontAwesomeIcon
          icon="history"
          className="transaction-icon h-margin-medium"
        />
        {t("parts.transaction-list.recent-transactions")}
      </div>
      <TransactionList transactions={recentTransactions} />{" "}
    </>
  );
}

export default RecentTransactions;
