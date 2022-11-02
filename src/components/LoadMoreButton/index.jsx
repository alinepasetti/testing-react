import React from "react";
import "./styles.css";

export const LoadMoreButton = ({ onClickHandler, disabled }) => {
  return (
    <div className="button-container">
      <button disabled={disabled} onClick={onClickHandler}>
        Load More Posts
      </button>
    </div>
  );
};
