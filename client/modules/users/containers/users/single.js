import Single from '../../components/users/single.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'
import { push } from 'react-router-redux';

import {getUserIdentity} from '../../../../../lib/utility';

export const singleComposer = ({context, clearErrors}, onData) => {
  const {Meteor, Store} = context();
  const loggedIn = Meteor.userId() || false;

  if (!loggedIn){
    Store.dispatch(push("/login"));;
  }

  const path = Store.getState().routing.locationBeforeTransitions.pathname;
  const _id = path.substr(path.lastIndexOf('/') + 1);

  if (Meteor.subscribe('users.single', _id).ready()) {
    const user = Meteor.users.findOne(_id);
    const email = user?getUserIdentity(user):"";

    onData(null, {...user.profile, user, email, _id});
  }

  // clearErrors when unmounting the component
  return clearErrors;
};


export const depsMapper = (context, actions) => ({
  deleteAction: actions.users.delete,
  clearErrors: actions.users.clearErrors,
  context: () => context
});

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    error: state.error.usersDeleteError,
  }
};

export default composeAll(
  connect(mapStateToProps),
  composeWithTracker(singleComposer),
  useDeps(depsMapper)
)(Single);
