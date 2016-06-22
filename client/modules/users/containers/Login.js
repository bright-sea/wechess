import Login from '../components/Login.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'
import { push } from 'react-router-redux';

export const composer = ({context, clearErrors}, onData) => {

  onData(null, {});

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitLoginAction: actions.account.login,
  clearErrors: actions.account.loginErrorClear,
  loginWithFacebook: actions.account.loginWithFacebook,
  loginWithTwitter: actions.account.loginWithTwitter,
  loginWithGoogle: actions.account.loginWithGoogle,
  loginWithGithub: actions.account.loginWithGithub,
  context: () => context,
});

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    loginError: state.error.loginError,
    loginSocialError: state.error.loginSocialError,
  }
};

export default composeAll(
  connect(mapStateToProps),
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Login);
