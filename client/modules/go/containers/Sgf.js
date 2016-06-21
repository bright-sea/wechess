import Sgf from '../components/Sgf.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';


export const composer = ({context}, onData) => {
  const {Meteor, Collections, Store} = context();

  const path = Store.getState().routing.locationBeforeTransitions.pathname;
  const sgfId = path.substr(path.lastIndexOf('/') + 1);

  if (Meteor.subscribe('sgfs.single', sgfId).ready()){
    const sgf = Collections.Sgfs.findOne(sgfId);

    if (!sgf){
      Store.dispatch(push("404"));;
    }else{
      onData(null, {sgf});
    }
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
