import React from "react";

const Response = ({ countries }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.alpha3Code}>{country.name}</div>
      ))}
    </div>
  );
};

export default Response;
