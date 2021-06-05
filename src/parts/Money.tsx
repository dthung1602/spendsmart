import React from "react";

import { localStorage } from "../database";

interface MoneyProps {
  value?: number;
  showCurrency?: boolean;
}

function Money({ value = 0, showCurrency = true }: MoneyProps): JSX.Element {
  let str = value % 1 === 0 ? value.toString() : value.toFixed(2);
  str = Number(str).toLocaleString("en");

  if (showCurrency) {
    if (localStorage.currencyPlacement === "after") {
      str += " " + localStorage.currencySymbol;
    } else {
      str = localStorage.currencySymbol + " " + str;
    }
  }

  return <>{str}</>;
}

export default Money;
