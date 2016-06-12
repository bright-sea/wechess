import GameList from '../components/GameList.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'

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
