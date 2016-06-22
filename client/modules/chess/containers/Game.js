import Game from '../components/Game.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';


export const composer = ({context}, onData) => {
  const {Meteor, Collections, Store} = context();

  const path = Store.getState().routing.locationBeforeTransitions.pathname;
  const gameId = path.substr(path.lastIndexOf('/') + 1);

  if(Meteor.subscribe('chessgames.single', gameId).ready() &&
    Meteor.subscribe('users.current').ready() ) {
    const game = Collections.ChessGames.findOne(gameId);
    const userId = Meteor.userId();

    const gameUrl = Meteor.absoluteUrl(`chess/game/${gameId}`);

    let user = null;

    if (userId){
      user = Meteor.users.findOne(userId);
    }

    if (!game){
      Store.dispatch(push("404"));;
    }else{
      onData(null, {game, gameUrl, userId, user});
    }
  }
};

export const depsMapper = (context, actions) => ({
  acceptRequest: actions.chessgames.acceptRequest,
  moveAction: actions.chessgames.update,
  clearErrors: actions.chessgames.clearErrors,

  openDialogAction: actions.core.openDialog,
  changeDeviceLayoutAction: actions.core.changeDeviceLayout,

  context: () => context,
});

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    stoneSound: state.stoneSound,
    deviceLayout: state.deviceLayout,
    invitationError: state.error.invitationError,
  }
};


export default composeAll(
  connect(mapStateToProps),
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Game);
