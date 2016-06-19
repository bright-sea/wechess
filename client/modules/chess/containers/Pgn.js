import Pgn from '../components/Pgn.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'

export const composer = ({context, pgnId}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('pgns.single', pgnId).ready()) {
    const pgn = Collections.Pgns.findOne(pgnId);
    onData(null, {pgn});
  }
};

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    stoneSound: state.stoneSound,
  }
};

export default composeAll(
  connect(mapStateToProps),
  composeWithTracker(composer),
  useDeps()
)(Pgn);
