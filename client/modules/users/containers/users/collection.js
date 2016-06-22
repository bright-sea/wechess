import Collection from '../../components/users/collection.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'
import { push } from 'react-router-redux';

export const composer = ({context}, onData) => {
  const {Meteor, Store} = context();
  const loggedIn = Meteor.userId() || false;

  if (!loggedIn){
    Store.dispatch(push("/login"));;
  }

  if (Meteor.subscribe('users.collection').ready()) {
    const collection = Meteor.users.find().fetch();
    onData(null, {loggedIn, collection});
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
)(Collection);
