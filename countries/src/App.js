import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchbox from "./components/Searchbox";
import CountryTable from "./components/CountryTable";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [showCountryDetails, setShowCountryDetails] = useState("");

  useEffect(() => {
    const API_URL = "https://restcountries.eu/rest/v2/all";
    axios.get(API_URL).then((response) => {
      setCountries(response.data);
    });
  }, []);

  const onShowCountryChange = (country) => {
    // console.log("inside onShowCountryChange, country = ", country);

    setShowCountryDetails(country);
  };

  const handleFilterTextChange = (event) => {
    setShowCountryDetails("");
    setFilterText(event.target.value);
  };

  return (
    <div>
      <div>
        <Searchbox
          filterText={filterText}
          onFilterTextChange={handleFilterTextChange}
        />{" "}
      </div>{" "}
      <CountryTable
        countries={countries}
        showCountryDetails={showCountryDetails}
        handleClick={onShowCountryChange}
        filterText={filterText}
      />
    </div>
  );
};

export default App;
