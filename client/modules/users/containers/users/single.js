import Single from '../../components/users/single.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'
import { push } from 'react-router-redux';

import {getUserIdentity} from '../../../../../lib/utility';

export const singleComposer = ({context, _id, clearErrors}, onData) => {
  const {Meteor} = context();
  if (Meteor.subscribe('users.single', _id).ready()) {
    const user = Meteor.users.findOne(_id);
    const email = user?getUserIdentity(user):"";
    // console.log('composer for single user', user);
    onData(null, {...user.profile, user, email});
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
