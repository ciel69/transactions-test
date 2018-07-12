import * as vars from 'src/constants/transactions';

const initialState = {
  isWaiting: false,
  list: [],
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case vars.GET_LIST_TRANSACTION_REQUEST:
      return { ...state, isWaiting: true };
    case vars.GET_LIST_TRANSACTION_SUCCESS:
      return {
        ...state,
        isWaiting: false,
        list: action.payload,
      };
    case vars.GET_LIST_TRANSACTION_FAILURE:
      return { ...state, isWaiting: false, list: action.payload };
    case vars.SEND_TRANSACTION_REQUEST:
      return { ...state, isWaiting: true };
    case vars.SEND_TRANSACTION_SUCCESS:
      const list = [...state.list, action.payload];
      localStorage.setItem('listTransactions', JSON.stringify(list));
      return { ...state, isWaiting: false, list };
    case vars.SEND_TRANSACTION_FAILURE:
      return { ...state, isWaiting: false };
    case vars.DEL_TRANSACTION_REQUEST:
      return { ...state, isWaiting: true };
    case vars.DEL_TRANSACTION_SUCCESS:
      const newList = state.list.filter(item => item.id !== action.payload);
      localStorage.setItem('listTransactions', JSON.stringify(newList));
      return { ...state, isWaiting: false, list: newList };
    case vars.DEL_TRANSACTION_FAILURE:
      return { ...state, isWaiting: false };
    default:
      return state;
  }
}
