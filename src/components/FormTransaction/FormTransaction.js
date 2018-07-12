import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Input from 'src/components/Ui/Input/Input';
import Select from 'src/components/Ui/Select/Select';

import './form-transaction.scss';

const FormTransaction = props => {
  return (
    <form onSubmit={props.handleSubmit} className="form-transaction">
      <div className="form-transaction__title title">Форма транзакции</div>
      <Field
        name="sum"
        className="form-transaction__input input"
        placeholder="Введите сумму"
        component={Input}
      />
      <Field
        name="bank"
        className="form-transaction__input input"
        placeholder="Выберите банк"
        options={props.banks.list}
        component={Select}
      />
      <button className="form-transaction__button button" type="submit">
        Отправить
      </button>
    </form>
  );
};

FormTransaction.propTypes = {
  handleSubmit: PropTypes.func,
  banks: PropTypes.object,
};

export default FormTransaction;
