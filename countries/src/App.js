import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchbox from "./components/Searchbox";
import Response from "./components/Response";

const App = () => {
  // const [country, setCountry] = useState();
  const [countries, setCountries] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    if (searchString) {
      const API_URL = `https://restcountries.eu/rest/v2/name/${searchString}?fields=name;capital;population;languages;flag`;
      axios.get(API_URL).then((response) => {
        setCountries(response.data);
      });
    }
  }, [searchString]);

  const setCountryName = (event) => {
    setSearchString(event.target.value);
  };

  return (
    <div>
      <div>
        <Searchbox searchString={searchString} handleChange={setCountryName} />{" "}
      </div>{" "}
      <Response countries={countries} />
    </div>
  );
};

export default App;
