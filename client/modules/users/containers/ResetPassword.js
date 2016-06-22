import ResetPassword from '../components/ResetPassword.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'
import { push } from 'react-router-redux';

export const composer = ({context, clearErrors}, onData) => {

  const path = Store.getState().routing.locationBeforeTransitions.pathname;
  const token = path.substr(path.lastIndexOf('/') + 1);

  onData(null, {token});

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitResetPasswordAction: actions.account.resetPassword,
  clearErrors: actions.account.resetPasswordErrorClear,
  context: () => context,
});

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    resetPasswordError: state.error.resetPasswordError,
  }
};

export default composeAll(
  connect(mapStateToProps),
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ResetPassword);


