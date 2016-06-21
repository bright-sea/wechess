import Home from '../components/NotFound.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'

export const depsMapper = (context, actions) => ({
  context: () => context,
});

const mapStateToProps = (state, ownProps) => {
  return {
    i18n: state.i18n,
    location: ownProps.location,
  }
};

export default composeAll(
  connect(mapStateToProps),
  useDeps(depsMapper)
)(Home);
