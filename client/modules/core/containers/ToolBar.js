import ToolBar from '../components/ToolBar.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'

import {getUserIdentity} from '../../../../lib/utility';



const composer = ({context}, onData) => {

  const {Meteor} = context();

  if (Meteor.subscribe('users.current').ready()) {
    // const loggedIn = Meteor.userId() ? true : false;
    // const loggedIn = Meteor.userId() === true;
    const loggedIn = Meteor.userId() || false;
    const user = Meteor.users.findOne(Meteor.userId());
    const name = user?getUserIdentity(user):" ";
    const appName = Meteor.settings.public.appName;
    // const email = user.firstEmail();

    onData(null, {loggedIn, user, name, appName});
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
  openDialogAction: actions.core.openDialog,
  closeDialogAction: actions.core.closeDialog,

  submitInvitationAction: actions.core.invitation,
  clearInvitationErrors: actions.core.invitationErrorClear,

  context: () => context,
});

const mapStateToProps = (state) => {
  return {
    locale: state.locale,
    i18n: state.i18n,
    dialog: state.dialog,
    loginError: state.error.loginError,
    loginSocialError: state.error.loginSocialError,
    registerError: state.error.registerError,
    passwordError: state.error.passwordError,
  }
};

export default composeAll(
  connect(mapStateToProps),
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ToolBar);
