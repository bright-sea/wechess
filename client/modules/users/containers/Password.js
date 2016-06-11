import Password from '../components/Password.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'

export const composer = ({context, clearErrors}, onData) => {

  onData(null, {});

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitPasswordAction: actions.account.password,
  clearErrors: actions.account.passwordErrorClear,
  context: () => context,
});

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    passwordError: state.error.passwordError,
  }
};

export default composeAll(
  connect(mapStateToProps),
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Password);
