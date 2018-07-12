import React from 'react';
import { connect } from 'react-redux';

import Menu from 'src/components/Menu/Menu';
import Auth from 'src/containers/Auth/Auth';

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const isAuth = Page =>
  connect(mapStateToProps)(props => {
    return (
      <div>
        {props.user.isAuthorization === true ? (
          <div>
            <Menu />
            <Page {...props} />
          </div>
        ) : (
          <Auth {...props} />
        )}
      </div>
    );
  });

export default isAuth;
