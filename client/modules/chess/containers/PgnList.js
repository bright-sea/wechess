import PgnList from '../components/PgnList.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('pgns.list').ready()) {
    const pgns = Collections.Pgns.find({}, {sort:{createdAt: -1}}).fetch();
    onData(null, {pgns});
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
)(PgnList);
