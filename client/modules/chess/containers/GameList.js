import GameList from '../components/GameList.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'

export const composer = ({context}, onData) => {

  const {Meteor, Collections} = context();

  const userId = Meteor.userId();

  let chessgames = [];

  if (Meteor.subscribe('users.current').ready()){

    const loggedIn = userId || false;
    const user = Meteor.users.findOne(userId);

    if (userId){
      if (Meteor.subscribe('chessgames.list.active', userId).ready()) {
        chessgames = Collections.ChessGames.find({});
        onData(null, {loggedIn, user, chessgames});
      }
    }else{
      onData(null, {loggedIn, user, chessgames});
    }
  }
};


export const depsMapper = (context, actions) => ({
  context: () => context
});

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
  }
};

export default composeAll(
  connect(mapStateToProps),
  composeWithTracker(composer),
  useDeps(depsMapper)
)(GameList);
