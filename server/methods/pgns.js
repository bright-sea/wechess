import {Pgns} from '../../lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {

  Meteor.methods({
    'pgns.create'(_id, title, content) {
      check(_id, String);
      check(title, String);
      check(content, String);

      // Show the latency compensations
      Meteor._sleepForMs(500);

      // XXX: Do some user authorization
      const createdAt = new Date();
      const pgn = {_id, title, content, createdAt};
      Pgns.insert(pgn);
    }
  });
}
