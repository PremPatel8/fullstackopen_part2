import React from "react";

const Response = ({ countries }) => {
  if (countries.length === 1 && countries[0].hasOwnProperty("flag")) {
    return (
      <div>
        <h1>{countries[0].name}</h1>
        <div>capital {countries[0].capital}</div>
        <div>population {countries[0].population}</div>
        <br></br>
        <h2>languages</h2>
        <ul>
          {countries[0].languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img src={countries[0].flag} alt="country flag" width="100" />
      </div>
    );
  } else {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.name}>{country.name}</div>
        ))}
      </div>
    );
  }
};

export default Response;
