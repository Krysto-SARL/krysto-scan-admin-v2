import React from 'react';
import './searchBar.css'

function SearchBar({ onSearch }) {

  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className='searchBar-container'>
      <input
        type="text"
        placeholder="Rechercher..."
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default SearchBar;
