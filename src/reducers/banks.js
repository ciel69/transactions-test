import * as vars from 'src/constants/banks';

const initialState = {
  isWaiting: false,
  isWaitingTransaction: false,
  list: JSON.parse(localStorage.getItem('listBanks')) || [],
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case vars.LIST_BANKS_REQUEST:
      return { ...state, isWaiting: true };
    case vars.LIST_BANKS_SUCCESS:
      return {
        ...state,
        isWaiting: false,
        list: action.payload,
      };
    case vars.LIST_BANKS_FAILURE:
      return { ...state, isWaiting: false, list: action.payload };
    default:
      return state;
  }
}
