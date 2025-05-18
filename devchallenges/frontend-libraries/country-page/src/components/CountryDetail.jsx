import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

async function fetchBorderCountry(border) {
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${border}?fields=flags,name`
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const res = await response.json();
  return res;
}

function CountryDetail() {
  const [borderCountries, setBorderCountries] = useState([]);
  const { ccn3 } = useParams();

  const translateFn = async () => {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${ccn3}?fields=flags,name,population,area,capital,subregion,languages,currencies,continents,borders`
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return response.json();
  };

  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["country", ccn3],
    queryFn: translateFn,

    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (!data) return;
    async function fetchAllBorders() {
      try {
        const promises = data.borders.map(border => fetchBorderCountry(border));
        const results = await Promise.all(promises);
        setBorderCountries(results);
      } catch (error) {
        console.error("Failed to fetch border countries:", error);
      }
    }
    fetchAllBorders();
  }, [data]);

  return (
    <section className="bg-[#1B1D1F] border border-[#282B30] sm:rounded-xl mx-auto -mt-[45px] sm:-mt-[60px] max-w-[720px] w-full text-[#D2D5DA] z-10 flex flex-col gap-10">
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <>
          <div className="max-w-[260px] min-h-[196px] mx-auto -mt-[37.5px] sm:-mt-[50px] grid">
            <img
              src={data.flags.png}
              alt={`${data.name.common}'s flag. ${data.flags.alt}`}
              className="w-full h-full rounded-xl"
            />
          </div>

          <div className="text-center">
            <h1 className="text-[2rem] font-vietnam-medium">
              {data.name.common}
            </h1>

            <p className="text-lg">{data.name.official}</p>
          </div>

          <div className="flex gap-10 justify-center flex-wrap px-5">
            <div className="grow bg-[#282B30] px-5 py-2 rounded-xl flex items-center justify-center">
              <p className="pr-5 border-r py-2 border-[#1B1D1F]">Population</p>

              <p className="pl-5 py-2 text-lg font-vietnam-medium">
                {data.population.toLocaleString()}
              </p>
            </div>

            <div className="grow bg-[#282B30] px-5 py-2 rounded-xl flex items-center justify-center">
              <p className="pr-5 border-r py-2 border-[#1B1D1F]">Area(km2)</p>

              <p className="pl-5 py-2 text-lg font-vietnam-medium">
                {data.area.toLocaleString()}
              </p>
            </div>
          </div>

          {/* details - Start */}
          <div className="text-sm">
            <div className="border-t border-[#282B30] px-5 py-6 flex justify-between">
              <p>Capital</p>

              <p>{data.capital.join(", ")}</p>
            </div>

            <div className="border-t border-[#282B30] px-5 py-6 flex justify-between">
              <p>Subregion</p>

              <p>{data.subregion}</p>
            </div>

            <div className="border-t border-[#282B30] px-5 py-6 flex justify-between">
              <p>Language</p>

              <p>
                {Object.keys(data.languages).map(key => data.languages[key])}
              </p>
            </div>

            <div className="border-t border-[#282B30] px-5 py-6 flex justify-between">
              <p>Currencies</p>

              <p>
                {Object.keys(data.currencies).map(
                  key => data.currencies[key].name
                )}
              </p>
            </div>

            <div className="border-t border-[#282B30] px-5 py-6 flex justify-between">
              <p>Continents</p>

              <p>{data.continents.join(", ")}</p>
            </div>

            <div className="border-t border-[#282B30] px-5 py-6 flex flex-col gap-6">
              <p>Neighbouring Countries</p>

              <div className="flex gap-4 flex-wrap">
                {borderCountries.map((country, index) => (
                  <div key={index} className="flex flex-col gap-1.5">
                    <img
                      src={country.flags.png}
                      alt={`Flag of ${country.name.common}. ${country.flags.alt}`}
                      className="rounded-md w-20 h-[60px]"
                    />
                    <span>{country.name.common}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* details - End */}
        </>
      )}
      {isError && <p>Error: {error.message}</p>}
    </section>
  );
}

export default CountryDetail;
