import React from 'react';
import T from 'prop-types';

const ErrorMessage = ({message}) => (
  <div className="text-danger"> {message} </div>
);

ErrorMessage.propTypes = {
  message: T.string
}

ErrorMessage.defaultProps = {
  message: 'An error occurred, please reload the page'
}

export default ErrorMessage;
