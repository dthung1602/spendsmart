import React from "react";

import "./PageHeaderHighLight.less";

import { formatMoney } from "../../utils";

interface PageHeaderHighLightProp {
  thisWeek: number;
  thisMonth: number;
}

function PageHeaderHighLight({
  thisWeek,
  thisMonth,
}: PageHeaderHighLightProp): JSX.Element {
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
          <div className="sub-title">This week</div>
          <div className="total">{formatMoney(thisWeek)}</div>
        </div>
        <div>
          <div className="sub-title">This month</div>
          <div className="total">{formatMoney(thisMonth)}</div>
        </div>
      </div>
    </div>
  );
}

export default PageHeaderHighLight;
