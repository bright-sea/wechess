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
    const appName = Meteor.settings.public.appName;

    if (userId){
      user = Meteor.users.findOne(userId);
      name = getUserIdentity(user);
    }

    onData(null, {loggedIn, user, name, appName});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

const mapStateToProps = (state, ownProps) => {
  return {
    i18n: state.i18n,
    location: ownProps.location,
  }
};

export default composeAll(
  connect(mapStateToProps),
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Home);
