import React from "react";

const CountryRow = ({ country, handleClick }) => {
  return (
    <li>
      <div>
        {country.name}{" "}
        <button onClick={() => handleClick(country.name)}> show </button>
      </div>
    </li>
  );
};

export default CountryRow;
