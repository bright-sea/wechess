import ToolBar from '../components/ToolBar.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import {getUserIdentity} from '/lib/utility';



const composer = ({context}, onData) => {

  const {Meteor, LocalState} = context();

  if (Meteor.subscribe('users.current').ready()) {
    // const loggedIn = Meteor.userId() ? true : false;
    // const loggedIn = Meteor.userId() === true;
    const loggedIn = Meteor.userId() || false;
    const user = Meteor.users.findOne(Meteor.userId());
    const name = user?getUserIdentity(user):" ";
    const appName = Meteor.settings.public.appName;
    // const email = user.firstEmail();

    const loginError = LocalState.get('LOGIN_ERROR');
    const registerError = LocalState.get('REGISTER_ERROR');
    const passwordError = LocalState.get('PASSWORD_ERROR');

    onData(null, {loggedIn, user, name, appName, loginError, registerError, passwordError});
  }

};

export const depsMapper = (context, actions) => ({
  submitLoginAction: actions._account.login,
  clearLoginErrors: actions._account.loginErrorClear,
  loginWithFacebook: actions._account.loginWithFacebook,
  loginWithTwitter: actions._account.loginWithTwitter,
  loginWithGoogle: actions._account.loginWithGoogle,
  loginWithGithub: actions._account.loginWithGithub,

  submitRegisterAction: actions._account.register,
  clearRegisterErrors: actions._account.registerErrorClear,
  submitPasswordAction: actions._account.password,
  clearPasswordErrors: actions._account.passwordErrorClear,

  context: () => context
});


export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ToolBar);
