import ToolBar from '../components/ToolBar.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import {getUserIdentity} from '../../../../lib/utility';



const composer = ({context}, onData) => {

  const {Meteor, LocalState, Store} = context();

  const locale = Store.getState().locale;
  const i18n = Store.getState().i18n;

  console.log("locale", locale);
  console.log("i18n", i18n);

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

    onData(null, {locale, i18n, loggedIn, user, name, appName, loginError, registerError, passwordError});
  }

};

export const depsMapper = (context, actions) => ({
  submitLoginAction: actions.account.login,
  clearLoginErrors: actions.account.loginErrorClear,
  loginWithFacebook: actions.account.loginWithFacebook,
  loginWithTwitter: actions.account.loginWithTwitter,
  loginWithGoogle: actions.account.loginWithGoogle,
  loginWithGithub: actions.account.loginWithGithub,

  submitRegisterAction: actions.account.register,
  clearRegisterErrors: actions.account.registerErrorClear,
  submitPasswordAction: actions.account.password,
  clearPasswordErrors: actions.account.passwordErrorClear,

  switchLocaleAction: actions.core.switchLocale,

  context: () => context
});


export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ToolBar);
