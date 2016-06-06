import NewGame from '../components/NewGame.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const usersComposer = ({context}, onData) => {
  const {Meteor, FLowRouter} = context();

  if (Meteor.subscribe('users.current').ready()) {
    const loggedIn = Meteor.userId() || false;
    const user = Meteor.users.findOne(Meteor.userId());

    onData(null, {loggedIn, user});
  }
};


export const depsMapper = (context, actions) => ({
  create: actions.gogames.create,
  clearErrors: actions.gogames.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(usersComposer),
  useDeps(depsMapper)
)(NewGame);
