import GameList from '../components/GameList.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  const userId = Meteor.userId();

  let gogames = [];

  if (Meteor.subscribe('users.current').ready()){

    const loggedIn = userId || false;
    const user = Meteor.users.findOne(userId);

    if (userId){
      if (Meteor.subscribe('gogames.list.active', userId).ready()) {
        gogames = Collections.GoGames.find({});
        onData(null, {loggedIn, user, gogames});
      }
    }else{
      onData(null, {loggedIn, user, gogames});
    }
  }
};


export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(GameList);
