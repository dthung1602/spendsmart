import React, { ChangeEventHandler, useContext } from "react";
import { cloneDeep, get, set, omit, debounce } from "lodash";

import { Affix } from "../../components";
import { GlobalContext } from "../../GlobalContext";
import { QueryObject, Transaction } from "../../database";
import type { ReactSetter } from "../../utils/types";
import "./TransactionFilter.less";
import { useTranslation } from "../../utils/hooks";

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
  const { t } = useTranslation();
  const { categoryOptions } = useContext(GlobalContext);

  const emptyOption = t("parts.transaction-filter.category-empty-option");
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
        if (value === emptyOption) {
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
    <Affix
      offsetTop={0}
      className="transaction-filters padding-wide"
      theme="light"
    >
      <div className="flex-space-between">
        <label>{t("common.from")}</label>
        <input
          value={dateGTE}
          type="date"
          className="small-text light"
          onChange={onChange("spendDatetime.$gte", strToDate)}
        />
        <label>{t("common.to")}</label>
        <input
          value={dateLTE}
          type="date"
          className="small-text light"
          onChange={onChange("spendDatetime.$lte", strToDate)}
        />
      </div>
      <div className="flex-space-between t-margin-wide">
        <select
          className="small-text light"
          value={categoriesTitles}
          onChange={onChange("categoriesTitles.$eq")}
        >
          <option key={emptyOption} value={emptyOption}>
            -- {emptyOption} --
          </option>
          {categoryOptions.map((opt) => (
            <option key={opt.value} value={opt.displayText as string}>
              {opt.displayText}
            </option>
          ))}
        </select>
        <input
          className="small-text light"
          placeholder={t("common.search").toUpperCase()}
          onChange={debounce(onChange("$text"), 300)}
        />
      </div>
    </Affix>
  );
}

export default TransactionFilter;
