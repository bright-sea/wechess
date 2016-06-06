import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {

  Meteor.publish('users.collection', function () {
    const selector = {};
    const options = {
      // fields: {_id: 1, title: 1},
      sort: {createdAt: -1},
      limit: 10
    };
    const response = Meteor.users.find(selector, options);
    return response;
  });

  Meteor.publish('users.single', function (_id) {
    check(_id, String);
    const selector = {_id};
    const options = {
      fields: {
        "services.facebook.email": 1,
        "services.github.email": 1,
        "services.google.email": 1,
        "services.twitter.screenName": 1,
        "emails": 1,
        "profile": 1
      }
    };

    const response = Meteor.users.find(selector, options);
    return response;
  });

  Meteor.publish('users.current', function (_id) {
    // check(_id, String);
    // if (this.userId) {
    const selector = {_id};
    const options = {
      fields: {
        "services.facebook.email": 1,
        "services.github.email": 1,
        "services.google.email": 1,
        "services.twitter.screenName": 1,
        "emails": 1,
        "profile": 1
      }
    };

    const response = Meteor.users.find(selector, options);
    return response;
  });

  Meteor.publish("users.status", function() {
    const selector = {};
    const options = {
      fields: {_id: 1, status: 1},
    };

    return Meteor.users.find(selector, options);
  });

}
