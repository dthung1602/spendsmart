import { useState, useEffect } from "react";

import { FilterObject, Transaction } from "../../database";

type TransFil = FilterObject<Transaction>;

function useTransactionFilter(
  pageSize = 10
): [TransFil, (f: TransFil) => void, (p: number) => void] {
  const [page, setPage] = useState<number>(0);
  const [filter, setFilter] = useState<TransFil>({});

  useEffect(() => {
    setPage(0);
  }, [filter]);

  return [
    { ...filter, $skip: pageSize * page, $limit: page },
    setFilter,
    setPage,
  ];
}

export default useTransactionFilter;
