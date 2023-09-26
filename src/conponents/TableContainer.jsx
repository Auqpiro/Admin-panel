import PropTypes from 'prop-types';
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Filter from "./Filter";
import Items from "./Items";
import Pagination from "./Pagination";

function TableContainer({ items }) {
  const [searchParams] = useSearchParams();
  const searchQueryParam = searchParams.get("search");
  const typeQueryParam = searchParams.get("type");
  const tagQueryParam = searchParams.get("tag");
  
  const [paginationParams, setPaginationParams] = useState({
    active: 1,
    perPage: 5,
  });

  const types = items.reduce((acc, { type }) => {
    if (!acc.includes(type)) {
      acc.push(type);
    }
    return acc;
  }, ["default"]);
  
  const tags = items.reduce((acc, { tags }) => {
    const accLabels = acc.map(({ label }) => label);
    tags.forEach((tag) => {
      if (!accLabels.includes(tag.label)) {
        acc.push(tag);
      }
    });
    return acc;
  }, []);
  
  const filteredItems = items.filter(({ name, type, tags }) => {
    if (searchQueryParam) {
      const normaliseItemName = name.toLowerCase();
      const normaliseSearchQuery = searchQueryParam.toLowerCase();
      const searchQueryChecking = normaliseItemName.includes(normaliseSearchQuery)
      if (!searchQueryChecking) return false;
    }
    if (typeQueryParam) {
      const convertedType = type ? type : "default";
      const typeChecking = convertedType === typeQueryParam;
      if (!typeChecking) return false;
    }
    if (tagQueryParam) {
      const mappingItemTagsByLabel = tags.map(({ label }) => label);
      const tagChecking = tags.length && mappingItemTagsByLabel.includes(tagQueryParam);
      if (!tagChecking) return false;
    }
    return true;
  });
  
  const countPages =  Math.ceil(filteredItems.length / paginationParams.perPage);
  if (countPages && paginationParams.active > countPages) {
    setPaginationParams({ ...paginationParams, active: 1 });
  }

  const padStartOfPagination = paginationParams.perPage * (paginationParams.active - 1);
  const padEndOfPagination = paginationParams.perPage * paginationParams.active;

  return (
    <>
      <Filter
        values={{ types, tags }}
      />
      {filteredItems.length
        ? (
          <>
            <Items
              items={filteredItems.slice(padStartOfPagination, padEndOfPagination)}
            />
            <Pagination
              onSwitch={setPaginationParams}
              params={{
                ...paginationParams,
                count: countPages,
              }}
            />
          </>
        )
        : <h4 className="mt-3">Записи не обнаружены</h4>}
      
    </>
  );
}

TableContainer.propTypes = {
  items: PropTypes.array.isRequired,
};

export default TableContainer;