import React from "react";

export const Search = ({ onChangeHandler, searchInput }) => {
  return <input value={searchInput} onChange={onChangeHandler} type="search" />;
};
