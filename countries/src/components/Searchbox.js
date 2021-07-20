import React from "react";

const Searchbox = ({ searchString, handleChange }) => {
  return (
    <p>
      find countries <input value={searchString} onChange={handleChange} />
    </p>
  );
};

export default Searchbox;
