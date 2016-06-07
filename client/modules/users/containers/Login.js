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
  submitLoginAction: actions.account.login,
  clearLoginErrors: actions.account.loginErrorClear,
  loginWithFacebook: actions.account.loginWithFacebook,
  loginWithTwitter: actions.account.loginWithTwitter,
  loginWithGoogle: actions.account.loginWithGoogle,
  loginWithGithub: actions.account.loginWithGithub,
  context: () => context
});


export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Login);
