import Password from '../components/Password.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const passwordError = LocalState.get('PASSWORD_ERROR');
  onData(null, {passwordError});

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitPasswordAction: actions._account.password,
  clearPasswordErrors: actions._account.passwordErrorClear,
  context: () => context
});


export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Password);
