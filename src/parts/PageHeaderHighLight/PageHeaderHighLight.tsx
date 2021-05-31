import React from "react";

import { formatMoney } from "../../utils";
import { useTranslation } from "../../utils/hooks";
import "./PageHeaderHighLight.less";

interface PageHeaderHighLightProps {
  thisWeek: number;
  thisMonth: number;
}

function PageHeaderHighLight({
  thisWeek,
  thisMonth,
}: PageHeaderHighLightProps): JSX.Element {
  const { t } = useTranslation();

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
          <div className="total t-margin-medium">{formatMoney(thisWeek)}</div>
        </div>
        <div>
          <div className="sub-title small-text">
            {t("parts.page-header-highlight.this-month")}
          </div>
          <div className="total t-margin-medium">{formatMoney(thisMonth)}</div>
        </div>
      </div>
    </div>
  );
}

export default PageHeaderHighLight;
export type { PageHeaderHighLightProps };
