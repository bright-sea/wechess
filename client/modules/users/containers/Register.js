import Register from '../components/Register.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const registerError = LocalState.get('REGISTER_ERROR');
  onData(null, {registerError});

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitRegisterAction: actions._account.register,
  clearRegisterErrors: actions._account.registerErrorClear,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Register);
