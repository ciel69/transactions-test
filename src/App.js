import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotificationsSystem from 'reapop';
import notificationTheme from 'reapop-theme-bootstrap';

import isAuth from 'src/containers/IsAuth/IsAuth';
import Form from 'src/containers/Form/Form';
import TableTransaction from 'src/components/TableTransaction/TableTransaction';
import NotFound from 'src/components/NotFound/NotFound';

import './assets/scss/App.scss';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={isAuth(Form)} />
          <Route path="/table" exact component={isAuth(TableTransaction)} />
          <Route component={isAuth(NotFound)} />
        </Switch>
      </Router>
      <NotificationsSystem theme={notificationTheme} />
    </div>
  );
};

export default App;
