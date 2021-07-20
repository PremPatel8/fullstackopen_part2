import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchbox from "./components/Searchbox";
import Response from "./components/Response";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchString, setSearchString] = useState("");

  const [showCountryDetails, setShowCountryDetails] = useState(false);
  const [country, setCountry] = useState([]);

  const showCountry = (country) => {
    setCountry(country);
    setShowCountryDetails(!showCountryDetails);
  };

  useEffect(() => {
    const API_URL = "https://restcountries.eu/rest/v2/all";
    axios.get(API_URL).then((response) => {
      setCountries(response.data);
    });
  }, []);

  const setCountryName = (event) => {
    setSearchString(event.target.value);
    if (showCountryDetails) {
      setShowCountryDetails(!showCountryDetails);
    }
  };

  function filterCountries() {
    if (searchString === "") {
      return [];
    } else {
      let fCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(searchString.toLowerCase())
      );

      if (fCountries.length > 10) {
        return [{ name: "Too many matches, specify another filter" }];
      } else {
        return fCountries;
      }
    }
  }

  const countriesToDisplay = filterCountries();

  return (
    <div>
      <div>
        <Searchbox searchString={searchString} handleChange={setCountryName} />{" "}
      </div>{" "}
      <Response
        countries={countriesToDisplay}
        country={country}
        showCountryDetails={showCountryDetails}
        handleClick={showCountry}
      />
    </div>
  );
};

export default App;
