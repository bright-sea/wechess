import Profile from '../components/Profile.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'

export const composer = ({context}, onData) => {
  const {Meteor} = context();

  if (Meteor.subscribe('users.current').ready()) {
    const record = Meteor.users.findOne(Meteor.userId());
    onData(null, {record});
  }

};

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
  }
};

export default composeAll(
  connect(mapStateToProps),
  composeWithTracker(composer),
  useDeps()
)(Profile);
