import React from 'react';

const SearchBox = ({ onSearch }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search cars..."
      onChange={handleSearch}
    />
  );
};

export default SearchBox;
