import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import InputForm from "./components/InputForm";
import Phonenumbers from "./components/Phonenumbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterString] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  console.log("render", persons.length, "persons");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const filterNames = (event) => {
    setFilterString(event.target.value);
  };

  const filteredPersons =
    filterString !== ""
      ? persons.filter((person) =>
          person.name.toLowerCase().startsWith(filterString.toLowerCase())
        )
      : persons;

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((x) => x.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter filterString={filterString} handleChange={filterNames} />
      </div>
      <InputForm
        handleSubmit={addName}
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Phonenumbers filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
