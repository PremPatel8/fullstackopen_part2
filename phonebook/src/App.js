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
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    contactService.getAllContacts().then((initialContacts) => {
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

    const contact = persons.find((n) => n.name === newName);

    if (contact) {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one`
      );

      if (result) {
        const changedContact = { ...contact, number: newNumber };

        contactService
          .updateContact(contact.id, changedContact)
          .then((returnedContact) => {
            setPersons(
              persons.map((person) =>
                person.id !== changedContact.id ? person : returnedContact
              )
            );
            setNotificationMessage(`Updated ${changedContact.name}'s number`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch((error) => {
            alert(
              `Could not Update number for ${changedContact.name} on server due to ${error}`
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

      contactService.createContact(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });

      setNotificationMessage(`Added ${personObject.name}`);

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
          alert(`Could not Delete ${contact.name} on server due to ${error}`);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
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
