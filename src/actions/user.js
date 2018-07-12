import axios from 'axios';
import * as vars from 'src/constants/user';

export const authUser = payload => dispatch => {
  dispatch({
    type: vars.AUTH_USER_REQUEST,
  });

  axios
    .get('/ok.json', {
      params: payload,
    })
    .then(response => {
      if (response.data.ok) {
        dispatch({
          type: vars.AUTH_USER_SUCCESS,
          payload: true,
        });
        localStorage.setItem('userAuth', true);
      } else {
        dispatch({
          type: vars.AUTH_USER_FAILURE,
          payload: {
            isAuthorization: false,
            error: {
              login: 'incorrect',
            },
          },
        });
        localStorage.setItem('userAuth', false);
      }
    })
    .catch(error => {
      dispatch({
        type: vars.AUTH_USER_FAILURE,
        payload: {
          isAuthorization: false,
          error: error,
        },
      });
      localStorage.setItem('userAuth', false);
    });
};

export const logout = payload => (dispatch, getState) => {
  dispatch({
    type: vars.LOGOUT_USER_REQUEST,
  });
  const { isAuthorization } = getState().user;
  axios
    .get('/ok.json', {
      params: payload,
    })
    .then(response => {
      if (response.data.ok) {
        dispatch({
          type: vars.LOGOUT_USER_SUCCESS,
          payload: false,
        });
        localStorage.setItem('userAuth', false);
      } else {
        dispatch({
          type: vars.LOGOUT_USER_FAILURE,
          payload: {
            isAuthorization: isAuthorization,
            error: {
              login: 'incorrect',
            },
          },
        });
        localStorage.setItem('userAuth', isAuthorization);
      }
    })
    .catch(error => {
      dispatch({
        type: vars.LOGOUT_USER_FAILURE,
        payload: {
          isAuthorization: isAuthorization,
          error: error,
        },
      });
      localStorage.setItem('userAuth', isAuthorization);
    });
};
