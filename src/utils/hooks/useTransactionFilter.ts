import { useRef, useState } from "react";

import { FilterObject, QueryObject, Transaction } from "../../database";
import type { ReactSetter } from "../types";

type TransFil = FilterObject<Transaction>;
type TransQr = QueryObject<Transaction>;
type UseTransactionFilterReturn = {
  filter: TransFil;
  query: TransQr;
  setQuery: ReactSetter<TransQr>;
  page: number;
  setPage: ReactSetter<number>;
};

function useTransactionFilter(pageSize?: number): UseTransactionFilterReturn {
  const page = useRef<number>(0);
  const query = useRef<TransQr>({});

  const [filter, setFilter] = useState<TransFil>({
    $skip: pageSize === undefined ? undefined : 0,
    $limit: pageSize,
  });

  const setQuery: ReactSetter<TransQr> = (arg) => {
    const newQuery = typeof arg === "function" ? arg(query.current) : arg;
    query.current = newQuery;
    page.current = 0;
    setFilter({
      ...newQuery,
      $skip: 0,
      $limit: pageSize,
    });
  };

  const setPage: ReactSetter<number> = (arg) => {
    const newPage = typeof arg === "function" ? arg(page.current) : arg;
    page.current = newPage;
    setFilter({
      ...filter,
      $skip: pageSize === undefined ? undefined : pageSize * newPage,
      $limit: pageSize,
    });
  };

  return {
    filter,
    query: query.current,
    setQuery,
    page: page.current,
    setPage,
  };
}

export default useTransactionFilter;
