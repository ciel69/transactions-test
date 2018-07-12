import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Input from 'src/components/Ui/Input/Input';

import './form-auth.scss';

const FormAuth = props => {
  return (
    <form onSubmit={props.handleSubmit} className="form-auth">
      <div className="form-auth__title title">Авторизация</div>
      <Field
        name="login"
        className="form-auth__input input"
        placeholder="Логин"
        component={Input}
      />
      <Field
        name="password"
        className="form-auth__input input"
        placeholder="Пароль"
        component={Input}
      />
      <button className="form-auth__button button" type="submit">
        Отправить
      </button>
    </form>
  );
};

FormAuth.propTypes = {
  handleSubmit: PropTypes.func,
};

export default FormAuth;
