import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import './input.scss';

const Input = ({
  input,
  placeholder,
  type,
  className,
  meta: { touched, error },
}) => (
  <input
    {...input}
    className={ClassNames(className, 'input', {
      input_error: touched && error,
    })}
    placeholder={placeholder}
    type={type}
  />
);

Input.propTypes = {
  input: PropTypes.object,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  meta: PropTypes.object,
};

export default Input;
