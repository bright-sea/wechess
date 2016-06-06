import {Meteor} from 'meteor/meteor';

export default () => {
  if (Meteor.users.find().count() === 0 ) {
    Accounts.createUser({
      email: 'test@test.com',
      password: '88888888'
    });
    Accounts.createUser({
      email: 'test1@test.com',
      password: '88888888'
    });
  }
};
