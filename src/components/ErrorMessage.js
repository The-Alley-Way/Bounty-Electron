/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './ErrorMessage.css';

function ErrorMessage(props) {
  const { errorCode } = props;

  function getErrorMessage() {
    switch (errorCode) {
      case 'bounty-list-item-get-fail':
        return 'failed to get bounty list items';
      default:
        return 'Oops, something went wrong.';
    }
  }

  return errorCode ? <p className="error">{getErrorMessage()}</p> : null;
}

export default ErrorMessage;
