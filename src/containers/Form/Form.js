import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Joi from 'joi';
import {
  compose,
  withHandlers,
  lifecycle,
  branch,
  renderComponent,
} from 'recompose';

import { parsErrorJoi } from 'src/tools';

import * as banksActions from 'src/actions/banks';
import * as transactionsActions from 'src/actions/transactions';

import FormTransaction from 'src/components/FormTransaction/FormTransaction';
import PreLoader from 'src/components/PreLoader/PreLoader';

const schema = Joi.object().keys({
  sum: Joi.number().required(),
  bank: Joi.string()
    .regex(/^[a-zA-Z0-9]$/)
    .required(),
});

const mapStateToProps = state => {
  return {
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

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      this.props.banksActions.getListBanks();
    },
  }),
  branch(props => props.banks.isWaiting, renderComponent(PreLoader)),
  withHandlers({
    onSubmit: props => data => {
      props.transactionsActions.sendTransaction(data);
    },
  }),
  reduxForm({
    form: 'TransactionForm',
    validate: data =>
      parsErrorJoi(Joi.validate(data, schema, { abortEarly: false })),
  })
);

export default enhance(FormTransaction);
