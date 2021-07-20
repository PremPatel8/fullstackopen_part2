import React from "react";
import Countrydetails from "./Countrydetails";

const Response = ({ countries, country, showCountryDetails, handleClick }) => {
  // console.log("country = ", country);
  // console.log("showCountryDetails = ", showCountryDetails);

  if (showCountryDetails) {
    return <Countrydetails country={country} />;
  } else if (countries.length === 1 && countries[0].hasOwnProperty("flag")) {
    return <Countrydetails country={countries[0]} />;
  } else if (countries.length === 1 && !countries[0].hasOwnProperty("flag")) {
    return <div key={countries[0].name}>{countries[0].name}</div>;
  } else {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.name}>
            {country.name}{" "}
            <button onClick={() => handleClick(country)}> show </button>
          </div>
        ))}
      </div>
    );
  }
};

export default Response;
