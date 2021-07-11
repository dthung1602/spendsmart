import React, { ChangeEventHandler } from "react";
import { cloneDeep, get, set } from "lodash";

import { Affix } from "../../components";
import "./TransactionFilter.less";
import { FilterObject, Transaction } from "../../database";

interface TransactionFiltersProps {
  filter: FilterObject<Transaction>;
  setFilter: (filters: FilterObject<Transaction>) => void;
}

const strToDate = (str: string) => new Date(str);

function TransactionFilter({
  filter,
  setFilter,
}: TransactionFiltersProps): JSX.Element {
  const dateGTE = filter.spendDatetime?.$gte?.toISOString().slice(0, 10) || "";
  const dateLTE = filter.spendDatetime?.$lte?.toISOString().slice(0, 10) || "";

  const onChange = (
    fieldPath: string,
    cast: (value: string) => any = (value) => value
  ): ChangeEventHandler<HTMLInputElement> => (event) => {
    const newFilter = cloneDeep(filter);
    if (get(newFilter, fieldPath) !== cast(event.target.value)) {
      set(newFilter, fieldPath, cast(event.target.value));
      setFilter(newFilter);
    }
  };

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
