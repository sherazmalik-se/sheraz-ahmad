import React from "react";

function CountriesTableFooter({
  pagination,
  searchedCountriesLen,
  dispatchPagination,
}) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-sm self-end">
        Showing {pagination.start} to{" "}
        {pagination.end < searchedCountriesLen
          ? pagination.end
          : searchedCountriesLen}{" "}
        of {searchedCountriesLen} countries
      </span>

      <div className="flex gap-3">
        {pagination.start > 0 && (
          <button
            key="prev-page"
            className="px-3 py-1.5 border-2 border-[#282B30] rounded-xl"
            onClick={() => dispatchPagination({ type: "PREV_PAGE" })}
          >
            &laquo; Prev Page {pagination.currentPage - 1}
          </button>
        )}

        {pagination.end < searchedCountriesLen && (
          <button
            key="next-page"
            className="px-3 py-1.5 border-2 border-[#282B30] rounded-xl"
            onClick={() => dispatchPagination({ type: "NEXT_PAGE" })}
          >
            Next Page {pagination.currentPage + 1} &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default CountriesTableFooter;
