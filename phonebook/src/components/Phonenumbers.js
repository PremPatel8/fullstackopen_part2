import React from "react";

const Phonenumbers = ({ persons, handleDeleteContact }) => {
  return (
    <div>
      {persons.map((person) => (
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
