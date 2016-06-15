import SgfList from '../components/SgfList.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('sgfs.list').ready()) {
    const sgfs = Collections.Sgfs.find({}, {sort:{createdAt:-1}}).fetch();
    onData(null, {sgfs});
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
)(SgfList);
