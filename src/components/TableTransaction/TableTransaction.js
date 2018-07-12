import React from 'react';
import PropTypes from 'prop-types';

import { getNameBank } from 'src/tools';

import './table-transaction.scss';

const TableTransaction = props => {
  return (
    <div className="table-transaction">
      <div className="table-transaction__row">
        <div className="table-transaction__cell">Сума</div>
        <div className="table-transaction__cell">Банк</div>
        <div className="table-transaction__cell" />
      </div>
      {props.transactions.list.map(item => (
        <div key={item.id} className="table-transaction__row">
          <div className="table-transaction__cell">{item.sum}</div>
          <div className="table-transaction__cell">
            {getNameBank(props.banks.list, item.bank)}
          </div>
          <div className="table-transaction__cell">
            <button
              onClick={() => props.handleDelete(item.id)}
              className="table-transaction__button button"
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

TableTransaction.propTypes = {
  handleDelete: PropTypes.func,
  transactions: PropTypes.object,
  banks: PropTypes.object,
};

TableTransaction.defaultProps = {
  banks: {
    list: [],
  },
};

export default TableTransaction;
