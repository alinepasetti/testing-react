import P from 'prop-types';
import React from 'react';
import './styles.css';

export const Search = ({ onChangeHandler, searchValue }) => {
  return (
    <div className="search-container">
      <input placeholder="Type your search" value={searchValue} onChange={onChangeHandler} type="search" />
    </div>
  );
};

Search.propTypes = {
  onChangeHandler: P.func.isRequired,
  searchValue: P.string.isRequired,
};
