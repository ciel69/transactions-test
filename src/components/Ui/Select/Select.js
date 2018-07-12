import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const Select = ({
  input,
  placeholder,
  type,
  className,
  options = [],
  meta: { touched, error },
}) => (
  <select
    {...input}
    className={ClassNames(className, 'input', {
      input_error: touched && error,
    })}
  >
    <option>{placeholder}</option>
    {options.map((item, key) => (
      <option key={key} value={item.id}>
        {item.name}
      </option>
    ))}
  </select>
);

Select.propTypes = {
  input: PropTypes.object,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  meta: PropTypes.object,
  options: PropTypes.array,
};

export default Select;
