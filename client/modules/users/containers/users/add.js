import Add from '../../components/users/form.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'
import { push } from 'react-router-redux';

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Store} = context();

  const loggedIn = Meteor.userId() || false;
  if (!loggedIn) {
    Store.dispatch(push("/login"));
  }

  onData(null, {});

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitAction: actions.users.add,
  clearErrors: actions.users.clearUserErrors,
  context: () => context
});

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    error: state.error.usersSavingError,
  }
};

export default composeAll(
  connect(mapStateToProps),
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Add);
