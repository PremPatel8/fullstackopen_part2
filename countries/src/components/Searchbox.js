import React from "react";

const Searchbox = ({ filterText, onFilterTextChange }) => {
  return (
    <form>
      <p>
        find countries{" "}
        <input value={filterText} onChange={onFilterTextChange} />
      </p>
    </form>
  );
};

export default Searchbox;
