import React from 'react';
import './styles.css';

export const Search = ({ onChangeHandler, searchValue }) => {
  return (
    <div className="search-container">
      <input placeholder="Type your search" value={searchValue} onChange={onChangeHandler} type="search" />
    </div>
  );
};
