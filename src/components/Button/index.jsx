import P from 'prop-types';
import React from 'react';
import './styles.css';

export const Button = ({ onClickHandler, disabled = false }) => {
  return (
    <div className="button-container">
      <button disabled={disabled} onClick={onClickHandler}>
        Load More Posts
      </button>
    </div>
  );
};

Button.propTypes = {
  onClickHandler: P.func.isRequired,
  disabled: P.bool.isRequired,
};
