import axios from 'axios';
import * as vars from 'src/constants/banks';

export const getListBanks = () => dispatch => {
  dispatch({
    type: vars.LIST_BANKS_REQUEST,
  });

  axios
    .get('/banks.json')
    .then(response => {
      if (response.data.ok) {
        dispatch({
          type: vars.LIST_BANKS_SUCCESS,
          payload: response.data.list,
        });
        localStorage.setItem('listBanks', JSON.stringify(response.data.list));
      } else {
        dispatch({
          type: vars.LIST_BANKS_FAILURE,
          payload: [],
        });
        localStorage.setItem('listBanks', JSON.stringify([]));
      }
    })
    .catch(error => {
      dispatch({
        type: vars.LIST_BANKS_FAILURE,
        payload: {
          error: error,
        },
      });
      localStorage.setItem('listBanks', JSON.stringify([]));
    });
};
