import React from 'react'

const Filter = ({ filterString, handleChange }) => {
  return (
    <p>filter shown with <input value={filterString} onChange={handleChange} /></p>
  )
}

export default Filter