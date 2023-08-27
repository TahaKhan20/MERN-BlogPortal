import React, { useState } from 'react';
import './search.css';
import { Link } from 'react-router-dom';

function SearchBar({ onSearch }) {
  // State to hold the search query
  const [searchQuery, setSearchQuery] = useState('');


  // Handle input click to prevent default navigation
  const handleInputClick = (event) => {
    event.preventDefault();
  };

  return (
    <form className='f2'>
      {/* Input field for entering search query */}
      <input
        type="text"
        className='searchbar'
        placeholder='Search'
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        onClick={handleInputClick}
      />
      {/* Button to initiate search */}
      <Link className='btn' to='/search' onClick={() => onSearch(searchQuery)}>Search</Link>
    </form>
  );
}

export default SearchBar;
