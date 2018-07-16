import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  compose,
  withHandlers,
  lifecycle,
  branch,
  renderComponent,
} from 'recompose';

import * as banksActions from 'src/actions/banks';
import * as transactionsActions from 'src/actions/transactions';

import PreLoader from 'src/components/PreLoader/PreLoader';

import { getNameBank } from 'src/tools';

import './table-transaction.scss';

const mapStateToProps = state => {
  return {
    transactions: state.transactions,
    banks: state.banks,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    banksActions: bindActionCreators(banksActions, dispatch),
    transactionsActions: bindActionCreators(transactionsActions, dispatch),
  };
}

// сущность содержащая в себе всю логику компонента позволяющая отдельно
// разрабатывать и расширять локигу компонента не затрагивая его "view"
// такой подход позволяет визуально разделить компонент на логические части
// но может выглядеть сложным и не понятным для человека не умеющего работать с функциональным стилем (recompose)
const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      this.props.transactionsActions.getList();
      if (this.props.banks.list.length === 0) {
        this.props.banksActions.getListBanks();
      }
    },
  }),
  branch(
    props => props.transactions.isWaiting || props.banks.isWaiting,
    renderComponent(PreLoader)
  ),
  withHandlers({
    handleDelete: props => data => {
      props.transactionsActions.delTransaction(data);
    },
  })
);

// чистый компонент "view"
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

export default enhance(TableTransaction);
