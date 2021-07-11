import React, { ChangeEventHandler, useContext } from "react";
import { cloneDeep, get, set, omit, debounce } from "lodash";

import { Affix } from "../../components";
import { GlobalContext } from "../../GlobalContext";
import { QueryObject, Transaction } from "../../database";
import type { ReactSetter } from "../../utils/types";
import "./TransactionFilter.less";

type TranQr = QueryObject<Transaction>;

interface TransactionFiltersProps {
  filter: TranQr;
  setFilter: ReactSetter<TranQr>;
}

const strToDate = (str: string) => new Date(str);

const EMPTY = "-----";

function TransactionFilter({
  filter,
  setFilter,
}: TransactionFiltersProps): JSX.Element {
  const { categoryOptions } = useContext(GlobalContext);

  const dateGTE = filter.spendDatetime?.$gte?.toISOString().slice(0, 10) || "";
  const dateLTE = filter.spendDatetime?.$lte?.toISOString().slice(0, 10) || "";

  const categoriesTitles = filter.categoriesTitles?.$eq;

  function onChange<T>(
    fieldPath: string,
    cast?: (value: string) => T
  ): ChangeEventHandler<HTMLInputElement | HTMLSelectElement> {
    return (event) => {
      const value = cast ? cast(event.target.value) : event.target.value;
      if (get(filter, fieldPath) !== value) {
        let newFilter = cloneDeep(filter);
        if (value === EMPTY) {
          newFilter = omit(
            newFilter,
            fieldPath.split(".").slice(0, -1).join(".")
          );
        } else {
          set(newFilter, fieldPath, value);
        }
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
      <select
        value={categoriesTitles}
        onChange={onChange("categoriesTitles.$eq")}
      >
        <option key={EMPTY} value={EMPTY}>
          {EMPTY}
        </option>
        {categoryOptions.map((opt) => (
          <option key={opt.value} value={opt.displayText as string}>
            {opt.displayText}
          </option>
        ))}
      </select>
      <input onChange={debounce(onChange("$text"), 300)} />
    </Affix>
  );
}

export default TransactionFilter;
