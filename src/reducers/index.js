import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as notificationsReducer } from 'reapop';

import user from './user';
import banks from './banks';
import transactions from './transactions';

const reducers = {
  user,
  banks,
  transactions,
  form,
  notifications: notificationsReducer({
    closeButton: true,
    dismissAfter: 5000,
    status: 'default',
    position: 'tr',
    dismissible: true,
    allowHTML: false,
  }),
};

export default combineReducers(reducers);
