import React from 'react';

interface Props {
  errorCode: string;
}

function ErrorMessage({ errorCode }: Props) {
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
