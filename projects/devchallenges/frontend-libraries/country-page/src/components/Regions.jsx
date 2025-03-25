import React from "react";

const allRegions = [
  "Americas",
  "Antartic",
  "Africa",
  "Asia",
  "Europe",
  "Oceania",
];

function Regions({ regionsSelected, setRegionsSelected, dispatchPagination }) {
  function handleRegionClick(region) {
    if (regionsSelected.some(item => item === region)) {
      setRegionsSelected(prevRegionsSelected =>
        prevRegionsSelected.filter(item => item !== region)
      );
      return;
    }
    setRegionsSelected(prevRegionsSelected => [...prevRegionsSelected, region]);
  }

  return (
    <div className="mt-9 flex flex-col gap-3">
      <p className="text-xs">Region</p>

      <div className="flex flex-wrap gap-2.5 text-sm">
        {allRegions.map((region, index) => {
          return (
            <button
              key={index}
              className={`rounded-xl px-3 py-1.5 ${
                regionsSelected.some(item => item === region)
                  ? "bg-[#282B30]"
                  : ""
              }`}
              onClick={() => {
                handleRegionClick(region);
                dispatchPagination({ type: "RESET_PAGE" });
              }}
            >
              {region}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Regions;
