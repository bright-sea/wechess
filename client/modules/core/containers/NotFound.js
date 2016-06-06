import Home from '../components/NotFound.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  useDeps(depsMapper)
)(Home);
