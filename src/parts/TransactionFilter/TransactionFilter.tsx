import React, { ChangeEventHandler } from "react";
import { cloneDeep, get, set } from "lodash";

import { Affix } from "../../components";
import { QueryObject, Transaction } from "../../database";
import type { ReactSetter } from "../../utils/types";
import "./TransactionFilter.less";

type TranQr = QueryObject<Transaction>;

interface TransactionFiltersProps {
  filter: TranQr;
  setFilter: ReactSetter<TranQr>;
}

const strToDate = (str: string) => new Date(str);

function TransactionFilter({
  filter,
  setFilter,
}: TransactionFiltersProps): JSX.Element {
  const dateGTE = filter.spendDatetime?.$gte?.toISOString().slice(0, 10) || "";
  const dateLTE = filter.spendDatetime?.$lte?.toISOString().slice(0, 10) || "";

  function onChange<T>(
    fieldPath: string,
    cast?: (value: string) => T
  ): ChangeEventHandler<HTMLInputElement> {
    return (event) => {
      const value = cast ? cast(event.target.value) : event.target.value;
      if (get(filter, fieldPath) !== value) {
        const newFilter = cloneDeep(filter);
        set(newFilter, fieldPath, value);
        setFilter(newFilter);
      }
    };
  }

  return (
    <Affix offsetTop={0} className="transaction-filters">
      <input
        value={dateGTE}
        type="date"
        onChange={onChange("spendDatetime.$gte", strToDate)}
        placeholder="From"
      />
      <input
        value={dateLTE}
        type="date"
        onChange={onChange("spendDatetime.$lte", strToDate)}
        placeholder="To"
      />
    </Affix>
  );
}

export default TransactionFilter;
