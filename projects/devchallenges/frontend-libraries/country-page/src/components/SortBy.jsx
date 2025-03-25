import React from "react";

function SortBy({ sortBy, setSortBy, dispatchPagination }) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="sort" className="text-xs">
        Sort by
      </label>

      <select
        id="sort"
        className="cursor-pointer px-3 py-2 pr-8 border-2 border-[#282B30] rounded-xl appearance-none bg-[url('/resources/Expand_down.svg')] bg-no-repeat bg-[right_0.5rem_center] text-sm"
        value={sortBy}
        onChange={({ target }) => {
          setSortBy(target.value);
          dispatchPagination({ type: "RESET_PAGE" });
        }}
      >
        <option className="bg-[#1B1D1F]" value="area">
          Area
        </option>
        <option className="bg-[#1B1D1F]" value="name">
          Name
        </option>
        <option className="bg-[#1B1D1F]" value="population">
          Population
        </option>
      </select>
    </div>
  );
}

export default SortBy;
