import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import InputForm from "./components/InputForm";
import Phonenumbers from "./components/Phonenumbers";
import contactService from "./services/contacts";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterString] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    contactService.getAllContacts().then((initialContacts) => {
      setPersons(initialContacts);
    });
  }, []);

  const notify = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterStringChange = (event) => {
    setFilterString(event.target.value);
  };

  const addContact = (event) => {
    event.preventDefault();

    const existingContact = persons.find((n) => n.name === newName);

    if (existingContact) {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (result) {
        const changedContact = { ...existingContact, number: newNumber };

        contactService
          .updateContact(existingContact.id, changedContact)
          .then((returnedContact) => {
            setPersons(
              persons.map((person) =>
                person.id !== changedContact.id ? person : returnedContact
              )
            );
            notify(`Updated ${changedContact.name}'s number`);
          })
          .catch((error) => {
            notify(
              `Information of ${changedContact.name} has already been removed from server`
            );
          });
        setNewName("");
        setNewNumber("");
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      contactService
        .createContact(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          notify(`Added ${returnedPerson.name}`);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          notify(`${error.response.data.error} `, "error");
        });
      setNewName("");
      setNewNumber("");
    }
  };

  const deleteselectedContact = (contactID) => {
    const existingContact = persons.find((n) => n.id === contactID);

    const result = window.confirm(`Delete ${existingContact.name} ?`);

    if (result) {
      contactService
        .deleteContact(contactID)
        .then((response) => {
          setPersons(persons.filter((p) => p.id !== contactID));
          notify(`Deleted ${existingContact.name}`);
        })
        .catch((error) => {
          setPersons(persons.filter((p) => p.id !== contactID));
          notify(`${existingContact.name} had already been removed`, "error");
        });
    }
  };

  const personsToShow =
    filterString !== ""
      ? persons.filter((p) =>
          p.name.toLowerCase().startsWith(filterString.toLowerCase())
        )
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <div>
        <Filter
          filterString={filterString}
          handleChange={handleFilterStringChange}
        />
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
        persons={personsToShow}
        handleDeleteContact={deleteselectedContact}
      />
    </div>
  );
};

export default App;
