import { useRef, useState } from "react";

import { FilterObject, QueryObject, Transaction } from "../../database";

type TransFil = FilterObject<Transaction>;
type TransQr = QueryObject<Transaction>;
type UseTransactionFilterReturn = {
  filter: TransFil;
  query: TransQr;
  setQuery: (q: TransQr) => void;
  page: number;
  setPage: (p: number) => void;
};

function useTransactionFilter(pageSize?: number): UseTransactionFilterReturn {
  const page = useRef<number>(0);
  const query = useRef<TransQr>({});

  const [filter, setFilter] = useState<TransFil>({
    $skip: pageSize === undefined ? undefined : 0,
    $limit: pageSize,
  });

  function setQuery(newQuery: TransQr) {
    query.current = newQuery;
    setFilter({
      ...newQuery,
      $skip: 0,
      $limit: pageSize,
    });
  }

  function setPage(newPage: number) {
    page.current = newPage;
    setFilter({
      ...filter,
      $skip: pageSize === undefined ? undefined : pageSize * newPage,
      $limit: pageSize,
    });
  }

  return {
    filter,
    query: query.current,
    setQuery,
    page: page.current,
    setPage,
  };
}

export default useTransactionFilter;
