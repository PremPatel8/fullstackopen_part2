import React from "react";
import Countrydetails from "./Countrydetails";
import CountryRow from "./CountryRow";

const CountryTable = ({
  countries,
  filterText,
  showCountryDetails,
  handleClick,
}) => {
  // console.log("inside CountryTable countries = ", countries);

  const rows = [];

  countries.forEach((country) => {
    if (!country.name.toLowerCase().includes(filterText.toLowerCase())) {
      return;
    }
    if (showCountryDetails !== "" && country.name !== showCountryDetails) {
      return;
    }
    rows.push(
      <CountryRow
        country={country}
        key={country.name}
        handleClick={handleClick}
      />
    );
  });

  // console.log("rows = ", rows);
  // console.log("filterText = ", filterText);

  if (rows.length > 10) {
    if (filterText !== "") {
      return <p>Too many matches, specify another filter"</p>;
    } else {
      return <p></p>;
    }
  } else if (rows.length === 1) {
    return <Countrydetails country={rows[0].props.country} />;
  } else {
    return <ul>{rows}</ul>;
  }
};

export default CountryTable;
