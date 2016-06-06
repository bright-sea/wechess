import ResetPassword from '../components/ResetPassword.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, token, clearErrors}, onData) => {
  const {LocalState} = context();
  const resetPasswordError = LocalState.get('RESET_PASSWORD_ERROR');
  onData(null, {token, resetPasswordError});

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitResetPasswordAction: actions._account.resetPassword,
  clearResetPasswordErrors: actions._account.resetPasswordErrorClear,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ResetPassword);


