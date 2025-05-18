import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useReducer, useState } from "react";
import initialPagination from "../utilities/initialPagination";
import paginationReducer from "../utilities/paginationReducer";
import CountriesTable from "./CountriesTable";
import SortBy from "./SortBy";
import Regions from "./Regions";
import Status from "./Status";
import CountriesTableFooter from "./CountriesTableFooter";

function CountryRanking() {
  const [sortBy, setSortBy] = useState("population");
  const [regionsSelected, setRegionsSelected] = useState([
    "Americas",
    "Africa",
    "Asia",
    "Europe",
  ]);
  const [independent, setIndependent] = useState(true);
  const [unMember, setUnMember] = useState(true);
  const [search, setSearch] = useState("");
  const [pagination, dispatchPagination] = useReducer(
    paginationReducer,
    initialPagination
  );

  const translateFn = async () => {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=population,flags,name,ccn3,independent,unMember,region,area"
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return response.json();
  };

  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["countries"],
    queryFn: translateFn,

    refetchOnWindowFocus: false,
    retry: false,
  });

  const filteredCountries = useMemo(() => {
    if (!data) return [];

    return data
      .filter(
        country =>
          regionsSelected.length === 0 ||
          regionsSelected.includes(country.region)
      )
      .filter(country => {
        if (country.independent === undefined) return true;
        return country.independent === independent;
      })
      .filter(country => country.unMember === unMember);
  }, [data, regionsSelected, independent, unMember]);

  const sortedCountries = useMemo(() => {
    if (sortBy === "name") {
      return [...filteredCountries].sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
    } else if (sortBy === "population") {
      return [...filteredCountries].sort((a, b) => b.population - a.population);
    } else if (sortBy === "area") {
      return [...filteredCountries].sort((a, b) => b.area - a.area);
    }
    return filteredCountries;
  }, [filteredCountries, sortBy]);

  const searchedCountries = useMemo(() => {
    if (!search) return sortedCountries;

    const searchTerm = search.toLowerCase();
    return sortedCountries.filter(
      country =>
        country.name.common.toLowerCase().includes(searchTerm) ||
        country.region.toLowerCase().includes(searchTerm)
    );
  }, [sortedCountries, search]);

  const paginatedCountries = useMemo(() => {
    return searchedCountries.slice(pagination.start, pagination.end);
  }, [searchedCountries, pagination.start, pagination.end]);

  return (
    <div className="z-10 flex justify-center">
      <section className="bg-[#1B1D1F] border border-[#282B30] rounded-xl py-6 px-3 mdl:px-7 mx-3 mdl:mx-7 -mt-[60px] basis-7xl text-[#D2D5DA]">
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          </div>
        )}
        {isSuccess && (
          <>
            <div className="grid grid-cols-1 mdl:grid-cols-[1fr_384px] gap-6 justify-between items-center">
              <span>{`Found ${searchedCountries.length} countries`}</span>

              <div className="relative">
                <input
                  type="text"
                  className="cursor-text placeholder:text-[#D2D5DA] rounded-xl bg-[#282B30] pl-11 px-3 py-2.5 w-full"
                  placeholder="Search by Name, Region, Subregion"
                  value={search}
                  onChange={({ target }) => setSearch(target.value)}
                />

                <span className="bg-[url(/resources/Search.svg)] w-6 h-6 absolute top-1/2 -translate-y-1/2 left-2"></span>
              </div>
            </div>

            <div className="mt-9 grid gap-7 grid-cols-1 mdl:grid-cols-[215px_1fr]">
              {/* Left - Start */}
              <div className="font-vietnam-medium">
                <SortBy
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  dispatchPagination={dispatchPagination}
                />

                <Regions
                  regionsSelected={regionsSelected}
                  setRegionsSelected={setRegionsSelected}
                  dispatchPagination={dispatchPagination}
                />

                <Status
                  unMember={unMember}
                  setUnMember={setUnMember}
                  independent={independent}
                  setIndependent={setIndependent}
                  dispatchPagination={dispatchPagination}
                />
              </div>
              {/* Left - End */}

              {/* Right - Start */}
              <div className="grow flex flex-col gap-3 overflow-x-scroll lg:overflow-x-auto">
                <div className="grow">
                  <CountriesTable paginatedCountries={paginatedCountries} />
                </div>

                <CountriesTableFooter
                  pagination={pagination}
                  dispatchPagination={dispatchPagination}
                  searchedCountriesLen={searchedCountries.length}
                />
              </div>
              {/* Right - End */}
            </div>
          </>
        )}
        {isError && <p>{error.message}</p>}
      </section>
    </div>
  );
}

export default CountryRanking;
