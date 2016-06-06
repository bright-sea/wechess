import SgfList from '../components/SgfList.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('sgfs.list').ready()) {
    const sgfs = Collections.Sgfs.find().fetch();
    onData(null, {sgfs});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});


export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SgfList);
