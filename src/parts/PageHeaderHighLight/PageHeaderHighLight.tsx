import React, { useContext, useEffect, useState } from "react";
import { startOfMonth, startOfWeek } from "date-fns/fp";

import { notify } from "../../components";
import Money from "../Money";
import { useTranslation } from "../../utils/hooks";
import { transactionDataStore } from "../../database";
import { GlobalContext } from "../../GlobalContext";
import "./PageHeaderHighLight.less";

interface PageHeaderHighLightProps {
  thisWeek: number;
  thisMonth: number;
}

function PageHeaderHighLight(): JSX.Element {
  const { t } = useTranslation();
  const [thisWeekSum, setThisWeekSum] = useState(0);
  const [thisMonthSum, setThisMonthSum] = useState(0);
  const { changedTransaction } = useContext(GlobalContext);

  const now = new Date();

  useEffect(() => {
    transactionDataStore
      .find({ spendDatetime: { $gte: startOfWeek(now) } })
      .then((trans) => {
        setThisWeekSum(
          trans.map((t) => t.price).reduce((acc, val) => acc + val, 0)
        );
      })
      .catch((e) => notify(String(e), "error"));
    transactionDataStore
      .find({ spendDatetime: { $gte: startOfMonth(now) } })
      .then((trans) => {
        setThisMonthSum(
          trans.map((t) => t.price).reduce((acc, val) => acc + val, 0)
        );
      })
      .catch((e) => notify(String(e), "error"));
  }, [changedTransaction]);

  return (
    <div className="page-header-highlight">
      <svg className="page-header-background" viewBox="0 0 150 80">
        <path
          fill="#ff6053"
          fillOpacity="1"
          d="M 0 80 C 140 70 150 70 180 0 L 0 0"
        />
        <path
          fill="#ffa957"
          fillOpacity="1"
          d="M 0 70 C 130 60 150 70 180 0 L 0 0"
        />
        <path
          fill="#ede6cb"
          fillOpacity="1"
          d="M 0 60 C 120 50 150 70 180 0 L 0 0"
        />
      </svg>
      <div className="text-box">
        <div>
          <div className="sub-title small-text">
            {t("parts.page-header-highlight.this-week")}
          </div>
          <div className="total t-margin-medium">
            <Money value={thisWeekSum} />
          </div>
        </div>
        <div>
          <div className="sub-title small-text">
            {t("parts.page-header-highlight.this-month")}
          </div>
          <div className="total t-margin-medium">
            <Money value={thisMonthSum} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageHeaderHighLight;
export type { PageHeaderHighLightProps };
