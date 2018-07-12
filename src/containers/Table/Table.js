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

import TableTransaction from 'src/components/TableTransaction/TableTransaction';
import PreLoader from 'src/components/PreLoader/PreLoader';

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

export default enhance(TableTransaction);
