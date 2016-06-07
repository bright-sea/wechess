import {Pgns} from '../../lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('pgns.list', function () {
    const selector = {};
    const options = {
      fields: {_id: 1, title: 1},
      sort: {createdAt: -1},
      limit: 10
    };

    return Pgns.find(selector, options);
  });

  Meteor.publish('pgns.single', function (pgnId) {
    check(pgnId, String);
    const selector = {_id: pgnId};
    return Pgns.find(selector);
  });

}
