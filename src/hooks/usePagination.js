import { useEffect, useState, useMemo } from "react";

export function usePagination(items = [], pageSize = 10, options = []) {
  // resetOnItemsChange (default false) → se true, torna alla pagina 1 quando items cambia
  const { initialPage = 1, resetOnItemsChange = false } = options;
  const [page, setPage] = useState(initialPage);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  /* Math.ceil = arrotonda per eccesso (se servono 2.3 pagine → 3)
       Math.max(1, ...) = garantisce almeno 1 pagina anche quando l’array è vuoto
       Ex: 35 città con PAGE_NR = 12 → 35/12 = 2.916… → ceil = 3 → totalPages = 3 */

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [page, totalPages]);

  //reset a pagina 1 quando cambia array
  useEffect(() => {
    if (resetOnItemsChange) setPage(1);
  }, [items, resetOnItemsChange]);

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);
  /*useMemo() → restituisce un valore memoizzato 
     slice(start, start + pageSize) prende al massimo pageSize elementi a partire da start
    */

  const goToPage = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  return { page, setPage, totalPages, pageData, goToPage };
}
