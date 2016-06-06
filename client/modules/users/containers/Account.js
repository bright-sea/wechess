import Account from '../components/Account.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor} = context();

  if (Meteor.subscribe('users.current').ready()) {
    const record = Meteor.users.findOne(Meteor.userId());
    onData(null, {record});
  }

};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Account);
