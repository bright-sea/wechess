import About from '../components/About.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'

const composer = ({context}, onData) => {
  const {Meteor} = context();

  const appName = Meteor.settings.public.appName;
  onData(null, {appName});
};



export const depsMapper = (context, actions) => ({
  context: () => context,
});

const mapStateToProps = (state, ownProps) => {
  return {
    locale: state.locale,
    i18n: state.i18n,
  }
};

export default composeAll(
  connect(mapStateToProps),
  composeWithTracker(composer),
  useDeps(depsMapper)
)(About);
