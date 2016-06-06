import Pgn from '../components/Pgn.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, pgnId}, onData) => {
  const {Meteor, Collections, Tracker} = context();

  if (Meteor.subscribe('pgns.single', pgnId).ready()) {
    const pgn = Collections.Pgns.findOne(pgnId);
    onData(null, {pgn});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Pgn);
