import Register from '../components/Register.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'
import { push } from 'react-router-redux';

export const composer = ({context, clearErrors}, onData) => {

  onData(null, {});

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitRegisterAction: actions.account.register,
  clearErrors: actions.account.registerErrorClear,
  context: () => context,
});

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    registerError: state.error.registerError,
  }
};

export default composeAll(
  connect(mapStateToProps),
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Register);
