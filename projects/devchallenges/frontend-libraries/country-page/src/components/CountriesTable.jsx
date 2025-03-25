import React from "react";
import { useNavigate } from "react-router";

function CountriesTable({ paginatedCountries }) {
  const navigate = useNavigate();

  const handleTrClick = to => {
    navigate(to);
  };

  return (
    <table className="font-vietnam-medium w-full" role="table">
      <thead>
        <tr className="text-left text-xs">
          <td className=" pb-4 pr-3 border-b-2 border-[#282B30]" scope="col">
            Flag
          </td>

          <td className=" pb-4 pr-3 border-b-2 border-[#282B30]" scope="col">
            Name
          </td>

          <td className=" pb-4 pr-3 border-b-2 border-[#282B30]" scope="col">
            Population
          </td>

          <td className=" pb-4 pr-3 border-b-2 border-[#282B30]" scope="col">
            Area(km<sup>2</sup>)
          </td>

          <td className=" pb-4 pr-3 border-b-2 border-[#282B30]" scope="col">
            Region
          </td>
        </tr>
      </thead>

      <tbody className="font-vietnam-regular">
        {paginatedCountries.map((country, index) => {
          return (
            <tr
              key={index}
              className="hover:bg-[#282B30] cursor-pointer"
              onClick={() => handleTrClick(`/country/${country.ccn3}`)}
            >
              <td className="p-3 pl-0">
                <img
                  src={country.flags.png}
                  alt={`${country.name.common}'s flag. ${country.flags.alt}`}
                  className="max-w-12 h-10 rounded-sm"
                />
              </td>

              <td className="p-3 pl-0">{country.name.common}</td>

              <td className="p-3 pl-0">
                {country.population.toLocaleString()}
              </td>

              <td className="p-3 pl-0"> {country.area.toLocaleString()}</td>

              <td className="p-3 pl-0">{country.region}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CountriesTable;
