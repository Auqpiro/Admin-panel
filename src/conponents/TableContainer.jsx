import { useEffect, useMemo, useState } from "react";
import Filter from "./Filter";
import Items from "./Items";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";

function TableContainer({ items }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initSearchParams = {
    search: searchParams.get("search") || "",
    type: searchParams.get("type") || "",
    tag: searchParams.get("tag") || "",
  };

  const [filterParams, setFilterParams] = useState(initSearchParams);

  useEffect(() => {
    if (JSON.stringify(filterParams) !== JSON.stringify(initSearchParams)) {
      const filteredParamsEntries = Object.entries(filterParams).filter(([, val]) => val)
      setSearchParams(Object.fromEntries(filteredParamsEntries));
    }
  }, [filterParams])
  
  const [paginationParams, setPaginationParams] = useState({
    active: 1,
    perPage: 5,
  });

  const types = useMemo(() => items.reduce((acc, { type }) => {
    if (!acc.includes(type)) {
      acc.push(type);
    }
    return acc;
  }, ["default"]), [items]);
  
  const tags = useMemo(() => items.reduce((acc, { tags }) => {
    const accLabels = acc.map(({ label }) => label);
    tags.forEach((tag) => {
      if (!accLabels.includes(tag.label)) {
        acc.push(tag);
      }
    });
    return acc;
  }, []), [items]);

  const filteredItems = items
    .filter(({ name }) => filterParams.search.length ? name.toLowerCase().includes(filterParams.search.toLowerCase()) : true)
    .filter((item) => {
      const hasFilterType = !!filterParams.type;
      const hasFilterTag = !!filterParams.tag;
      const convertedType = (item.type ? item.type : "default");
      const matchesByType = convertedType === filterParams.type;
      const mappingItemTagsByLabel = item.tags.map(({ label }) => label);
      const matchesByTag = item.tags.length && mappingItemTagsByLabel.includes(filterParams.tag);
      const typeChecking = (hasFilterType ? matchesByType : true);
      const tagChecking =(hasFilterTag ? matchesByTag : true);
      return typeChecking && tagChecking;
    });

  return (
    <>
      <Filter onFilter={setFilterParams} values={{ types, tags }} params={filterParams}/>
      {filteredItems.length
        ? (
          <>
            <Items items={filteredItems.slice((paginationParams.perPage * (paginationParams.active - 1)), (paginationParams.perPage * paginationParams.active))}/>
            <Pagination onSwitch={setPaginationParams} count={Math.ceil(filteredItems.length / paginationParams.perPage)} params={paginationParams}/>
          </>
        )
        : <h4 className="mt-3">Записи не обнаружены</h4>}
      
    </>
  );
}

export default TableContainer;