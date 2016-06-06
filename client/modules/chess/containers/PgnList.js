import PgnList from '../components/PgnList.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('pgns.list').ready()) {
    const pgns = Collections.Pgns.find().fetch();
    onData(null, {pgns});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});


export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(PgnList);
