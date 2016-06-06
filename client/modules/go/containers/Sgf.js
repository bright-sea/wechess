import Sgf from '../components/Sgf.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, sgfId}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('sgfs.single', sgfId).ready()){
    const sgf = Collections.Sgfs.findOne(sgfId);
    onData(null, {sgf});
  }

};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Sgf);
