import React from "react";

const Phonenumbers = ({ filteredPersons, handleDeleteContact }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          <span>
            {person.name} {person.number}
          </span>{" "}
          <button onClick={() => handleDeleteContact(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Phonenumbers;
