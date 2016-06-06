import Login from '../components/Login.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const loginError = LocalState.get('LOGIN_ERROR');
  onData(null, {loginError});

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitLoginAction: actions._account.login,
  clearLoginErrors: actions._account.loginErrorClear,
  loginWithFacebook: actions._account.loginWithFacebook,
  loginWithTwitter: actions._account.loginWithTwitter,
  loginWithGoogle: actions._account.loginWithGoogle,
  loginWithGithub: actions._account.loginWithGithub,
  context: () => context
});


export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Login);
