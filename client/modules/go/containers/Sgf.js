import Sgf from '../components/Sgf.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'

export const composer = ({context, sgfId}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('sgfs.single', sgfId).ready()){
    const sgf = Collections.Sgfs.findOne(sgfId);
    onData(null, {sgf});
  }

};

export const depsMapper = (context, actions) => ({
  changeDeviceLayoutAction: actions.core.changeDeviceLayout,

  context: () => context,
});


const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    stoneSound: state.stoneSound,
    deviceLayout: state.deviceLayout,
  }
};

export default composeAll(
  connect(mapStateToProps),
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Sgf);
