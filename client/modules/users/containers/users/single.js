import Single from '../../components/users/single.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import {getUserIdentity} from '/lib/utility';

export const singleComposer = ({context, _id, clearErrors}, onData) => {
  const {Meteor, LocalState} = context();
  const error = LocalState.get('users.DELETE_ERROR');
  if (Meteor.subscribe('users.single', _id).ready()) {
    const user = Meteor.users.findOne(_id);
    const email = user?getUserIdentity(user):"";
    // console.log('composer for single user', user);
    onData(null, {...user.profile, user, email, error});
  }
  // clearErrors when unmounting the component
  return clearErrors;
};


export const depsMapper = (context, actions) => ({
  deleteAction: actions.users.delete,
  clearErrors: actions.users.clearErrors,
  context: () => context
});


export default composeAll(
  composeWithTracker(singleComposer),
  useDeps(depsMapper)
)(Single);
