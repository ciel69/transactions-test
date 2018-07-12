import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Joi from 'joi';
import { compose, withHandlers } from 'recompose';

import { parsErrorJoi } from 'src/tools';

import * as userActions from 'src/actions/user';

import FormAuth from 'src/components/FormAuth/FormAuth';

const schema = Joi.object().keys({
  login: Joi.string()
    .alphanum()
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    userActions: bindActionCreators(userActions, dispatch),
  };
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onSubmit: props => data => {
      props.userActions.authUser(data);
    },
  }),
  reduxForm({
    form: 'AuthForm',
    validate: data =>
      parsErrorJoi(Joi.validate(data, schema, { abortEarly: false })),
  })
);

export default enhance(FormAuth);
