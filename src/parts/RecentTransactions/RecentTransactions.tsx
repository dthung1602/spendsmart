import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { subWeeks } from "date-fns/fp";

import TransactionList from "../TransactionList";
import { notify } from "../../components";
import { GlobalContext } from "../../GlobalContext";
import { Transaction, transactionDataStore } from "../../database";
import { useTranslation } from "../../utils/hooks";
import "./RecentTransactions.less";

const subOneWeek = subWeeks(1);

function RecentTransactions(): JSX.Element {
  const { t } = useTranslation();
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );
  const { changedTransaction } = useContext(GlobalContext);

  useEffect(() => {
    transactionDataStore
      .find({ spendDatetime: { $gte: subOneWeek(new Date()) } })
      .then((trans) => {
        setRecentTransactions(trans);
      })
      .catch((e) => notify(String(e), "error"));
  }, [changedTransaction]);

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
