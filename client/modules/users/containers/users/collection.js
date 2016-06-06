import Collection from '../../components/users/collection.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor} = context();

  if (Meteor.subscribe('users.collection').ready()) {
    const collection = Meteor.users.find().fetch();

    console.log("collection", collection);
    onData(null, {collection});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});



export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Collection);
