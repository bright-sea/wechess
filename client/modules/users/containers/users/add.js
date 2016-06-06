import Add from '../../components/users/form.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('users.USER_SAVING_ERROR');
  onData(null, {error});

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitAction: actions.users.add,
  clearErrors: actions.users.clearUserErrors,
  context: () => context
});



export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Add);
