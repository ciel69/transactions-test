import axios from 'axios';
import { reset } from 'redux-form';
import { addNotification as notify } from 'reapop';

import * as vars from 'src/constants/transactions';

export const getList = () => dispatch => {
  dispatch({
    type: vars.GET_LIST_TRANSACTION_REQUEST,
  });

  axios
    .get('/ok.json')
    .then(response => {
      if (response.data.ok) {
        dispatch({
          type: vars.GET_LIST_TRANSACTION_SUCCESS,
          payload: JSON.parse(localStorage.getItem('listTransactions')) || [],
        });
      } else {
        dispatch({
          type: vars.GET_LIST_TRANSACTION_FAILURE,
          payload: [],
        });
      }
    })
    .catch(error => {
      dispatch({
        type: vars.GET_LIST_TRANSACTION_FAILURE,
        payload: {
          error: error,
        },
      });
    });
};

export const sendTransaction = payload => dispatch => {
  dispatch({
    type: vars.SEND_TRANSACTION_REQUEST,
  });
  axios
    .get('/ok.json')
    .then(response => {
      if (response.data.ok) {
        dispatch({
          type: vars.SEND_TRANSACTION_SUCCESS,
          payload: { id: Date.now(), ...payload },
        });
        dispatch(reset('TransactionForm'));
        dispatch(
          notify({
            message: 'Транзакция отправлена',
            status: 'success',
          })
        );
      } else {
        dispatch({
          type: vars.SEND_TRANSACTION_FAILURE,
          payload: [],
        });
      }
    })
    .catch(error => {
      dispatch({
        type: vars.SEND_TRANSACTION_FAILURE,
        payload: {
          error: error,
        },
      });
    });
};

export const delTransaction = payload => dispatch => {
  dispatch({
    type: vars.DEL_TRANSACTION_REQUEST,
  });
  axios
    .get('/ok.json')
    .then(response => {
      if (response.data.ok) {
        dispatch({
          type: vars.DEL_TRANSACTION_SUCCESS,
          payload: payload,
        });
      } else {
        dispatch({
          type: vars.DEL_TRANSACTION_FAILURE,
        });
      }
    })
    .catch(error => {
      dispatch({
        type: vars.DEL_TRANSACTION_FAILURE,
        payload: {
          error: error,
        },
      });
    });
};
