import NewGame from '../components/NewGame.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'

export const usersComposer = ({context}, onData) => {
  const {Meteor, FLowRouter} = context();

  if (Meteor.subscribe('users.current').ready()) {
    const loggedIn = Meteor.userId() || false;
    const user = Meteor.users.findOne(Meteor.userId());

    onData(null, {loggedIn, user});
  }
};


export const depsMapper = (context, actions) => ({
  create: actions.chessgames.create,
  clearErrors: actions.chessgames.clearErrors,
  openDialogAction: actions.core.openDialog,
  context: () => context
});

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
  }
};

export default composeAll(
  connect(mapStateToProps),
  composeWithTracker(usersComposer),
  useDeps(depsMapper)
)(NewGame);
