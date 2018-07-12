import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import ClassNames from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'src/actions/user';

import './menu.scss';

const Menu = props => {
  return (
    <div className="menu">
      <Link
        className={ClassNames('menu__link', {
          menu__link_active: props.location.pathname === '/',
        })}
        to="/"
      >
        Форма транзакции
      </Link>
      <Link
        className={ClassNames('menu__link', {
          menu__link_active: props.location.pathname === '/table',
        })}
        to="/table"
      >
        Таблица транзакций
      </Link>
      <div className="menu__link" onClick={() => props.userActions.logout()}>
        Выйти
      </div>
    </div>
  );
};

Menu.propTypes = {
  userActions: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    userActions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Menu));
