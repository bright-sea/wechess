import {GoGames} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {

  Meteor.methods({

    'gogames.create'(data) {
      check(data, {
        _id: String,
        creatorId: String,
        blackId: String,
        blackName: String,
        whiteId: String,
        whiteName: String,
        turn: Number,
        moves: Array,
        position: String,
        status: String,
      });

      data.createdAt = new Date();
      data.updateAt = data.createdAt;

      GoGames.insert(data);
    },

    'gogames.accept'(data, _id) {
      check(data, {
        whiteId: String,
        whiteName: String,
        blackId: String,
        blackName: String,
        status: String,
        position: String,
      });
      check(_id, String);

      data.updateAt = new Date();
      // XXX: Do some user authorization

      GoGames.update(_id, {
        $set: data
      });

    },

    'gogames.update'(data, _id) {
      check(data, {
        turn: Number,
        move: Object,
        position: String,
      });
      check(_id, String);

      // XXX: Do some user authorization

      GoGames.update(_id, {
        $set: {
          turn: data.turn,
          position: data.position,
          status: "playing",
          updateAt: new Date()
        },
        $push: {
          moves: data.move
        }
      });

    },



  });
}
