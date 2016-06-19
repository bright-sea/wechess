import Game from '../components/Game.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'

export const composer = ({context, gameId}, onData) => {
  const {Meteor, Collections, FlowRouter} = context();

  if(Meteor.subscribe('gogames.single', gameId).ready() &&
    Meteor.subscribe('users.current').ready() ) {
    const game = Collections.GoGames.findOne(gameId);
    const userId = Meteor.userId();
    const gameUrl = FlowRouter.url("/go/game/:gameId",{gameId:gameId});

    let user = null;

    if (userId){
      user = Meteor.users.findOne(userId);
    }

    if (!game){
      FlowRouter.go("404");
    }else{
      onData(null, {game, gameUrl, userId, user});
    }
  }
};

export const depsMapper = (context, actions) => ({
  acceptRequest: actions.gogames.acceptRequest,
  moveAction: actions.gogames.update,
  clearErrors: actions.gogames.clearErrors,

  openDialogAction: actions.core.openDialog,

  context: () => context,
});

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    stoneSound: state.stoneSound,
    invitationError: state.error.invitationError,
  }
};

export default composeAll(
  connect(mapStateToProps),
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Game);
