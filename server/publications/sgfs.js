import {Sgfs} from '../../lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('sgfs.list', function () {
    const selector = {};
    const options = {
      fields: {_id: 1, title: 1},
      sort: {createdAt: -1},
      limit: 10
    };

    return Sgfs.find(selector, options);
  });

  Meteor.publish('sgfs.single', function (sgfId) {
    check(sgfId, String);
    const selector = {_id: sgfId};
    return Sgfs.find(selector);
  });

}
