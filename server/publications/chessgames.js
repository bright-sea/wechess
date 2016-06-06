import {ChessGames} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {

  ChessGames._ensureIndex({ "blackId": 1});
  ChessGames._ensureIndex({ "whiteId": 1});
  ChessGames._ensureIndex({ "updateAt": 1});

  Meteor.publish('chessgames.single', function (gameId) {
    check(gameId, String);
    const selector = {_id: gameId};
    return ChessGames.find(selector);
  });

  Meteor.publish('chessgames.list.active', function (userId) {

    check(userId, String);
    const selector = {
      $or: [ { blackId: userId}, { whiteId: userId } ]
    };
    const options = {
      fields: {
        _id: 1,
        creatorId: 1,
        blackId: 1,
        blackName: 1,
        whiteId: 1,
        whiteName: 1,
        turn: 1,
        status: 1,
        createAt: 1,
        updateAt: 1,
      },
      sort: {updateAt: -1},
      //limit: 10
    };

    return ChessGames.find(selector, options);
  });



}
