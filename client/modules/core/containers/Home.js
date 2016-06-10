import Home from '../components/Home.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'


import {getUserIdentity} from '../../../../lib/utility';


export const composer = ({context}, onData) => {
  const {Meteor} = context();
  const userId = Meteor.userId();

  if (Meteor.subscribe('users.current').ready()){
    const loggedIn = userId || false;
    let user = null;
    let name = "";

    if (userId){
      user = Meteor.users.findOne(userId);
      name = getUserIdentity(user);
    }

    onData(null, {loggedIn, user, name});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  store: context.Store,
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
)(Home);
