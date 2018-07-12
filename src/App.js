import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotificationsSystem from 'reapop';
import notificationTheme from 'reapop-theme-bootstrap';

import isAuth from 'src/containers/IsAuth/IsAuth';
import Form from 'src/containers/Form/Form';
import Table from 'src/containers/Table/Table';
import NotFound from 'src/components/NotFound/NotFound';

import './assets/scss/App.scss';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={isAuth(Form)} />
          <Route path="/table" exact component={isAuth(Table)} />
          <Route component={isAuth(NotFound)} />
        </Switch>
      </Router>
      <NotificationsSystem theme={notificationTheme} />
    </div>
  );
};

export default App;
