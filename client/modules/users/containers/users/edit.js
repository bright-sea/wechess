import Edit from '../../components/users/form.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import {singleComposer} from './single.js';

export const editComposer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('users.USER_SAVING_ERROR');
  onData(null, {error});

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitAction: actions.users.update,
  clearErrors: actions.users.clearUserErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(singleComposer),
  composeWithTracker(editComposer),
  useDeps(depsMapper)
)(Edit);
