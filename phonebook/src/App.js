import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import InputForm from "./components/InputForm";
import Phonenumbers from "./components/Phonenumbers";
import contactService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterString] = useState("");

  useEffect(() => {
    contactService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  }, []);

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

  const addContact = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((x) => x.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      contactService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
      setNewName("");
      setNewNumber("");
    }
  };

  const deleteselectedContact = (contactID) => {
    const contact = persons.find((n) => n.id === contactID);

    const result = window.confirm(`Delete ${contact.name} ?`);

    if (result) {
      contactService
        .deleteContact(contactID)
        .then(() => {
          setPersons(persons.filter((n) => n.id !== contactID));
        })
        .catch((error) => {
          alert(`Could not Delete ${contact.name} from server due to ${error}`);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter filterString={filterString} handleChange={filterNames} />
      </div>
      <h2>add a new</h2>
      <InputForm
        handleSubmit={addContact}
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Phonenumbers
        filteredPersons={filteredPersons}
        handleDeleteContact={deleteselectedContact}
      />
    </div>
  );
};

export default App;
