import Game from '../components/Game.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, gameId}, onData) => {
  const {Meteor, Collections, FlowRouter, LocalState} = context();

  if(Meteor.subscribe('gogames.single', gameId).ready() &&
    Meteor.subscribe('users.current').ready() ) {
    const game = Collections.GoGames.findOne(gameId);
    const userId = Meteor.userId();
    const gameUrl = FlowRouter.url("/go/game/:gameId",{gameId:gameId});
    const invitationError = LocalState.get('INVITATION_ERROR');

    let user = null;

    if (userId){
      user = Meteor.users.findOne(userId);
    }

    if (!game){
      FlowRouter.go("404");
    }else{
      onData(null, {game, gameUrl, userId, user, invitationError});
    }
  }
};

export const depsMapper = (context, actions) => ({
  acceptRequest: actions.gogames.acceptRequest,
  moveAction: actions.gogames.update,
  clearErrors: actions.gogames.clearErrors,

  submitInvitationAction: actions.gogames.invitation,
  clearInvitationErrors: actions.gogames.invitationErrorClear,

  context: () => context
});



export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Game);
