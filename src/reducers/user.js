import * as vars from 'src/constants/user';

const initialState = {
  isAuthorization: JSON.parse(localStorage.getItem('userAuth')) || false,
  isWaiting: false,
  error: {},
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case vars.AUTH_USER_REQUEST:
      return { ...state, isWaiting: true };
    case vars.AUTH_USER_SUCCESS:
      return {
        ...state,
        isWaiting: false,
        error: {},
        isAuthorization: action.payload,
      };
    case vars.AUTH_USER_FAILURE:
      return { ...state, isWaiting: false, ...action.payload };
    case vars.LOGOUT_USER_REQUEST:
      return { ...state, isWaiting: true };
    case vars.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        isWaiting: false,
        error: {},
        isAuthorization: action.payload,
      };
    case vars.LOGOUT_USER_FAILURE:
      return { ...state, isWaiting: false, ...action.payload };
    default:
      return state;
  }
}
