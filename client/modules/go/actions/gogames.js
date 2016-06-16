import {getUserIdentity} from '../../../../lib/utility';

export default {
  create({Meteor, Store, FlowRouter}, order, creator, opponent) {
    const i18n = Store.getState().i18n;

    if (!creator) {
      return Store.dispatch({
        type: 'SET_SAVING_ERROR',
        message: i18n.MessageEmptyCreator,
      });
    }
    if (order !==0 && order !== 1) {
      return Store.dispatch({
        type: 'SET_SAVING_ERROR',
        message: i18n.MessageWrongOrder,
      });
    }

    Store.dispatch({
      type: 'SET_SAVING_ERROR',
      message: null,
    });

    let game ={};

    game._id = Meteor.uuid();
    game.creatorId = creator._id;
    game.blackId = order === 0?creator._id:(opponent?opponent._id:"");
    game.blackName = order === 0?getUserIdentity(creator):(opponent?getUserIdentity(opponent):"");
    game.whiteId = order === 0?(opponent?opponent._id:""):creator._id;
    game.whiteName = order === 0?(opponent?getUserIdentity(opponent):""):getUserIdentity(creator);
    game.turn = 0;
    game.moves = [];
    game.position = `(;GM[1]FF[4]
RU[Chinese]SZ[19]KM[7.50]TM[3600]OT[3x30 byo-yomi]
PW[${game.whiteName}]PB[${game.blackName}]
) `;
    game.status = "request";

    Meteor.call('gogames.create', game, (err) => {
      if (err) {
        return Store.dispatch({
          type: 'SET_SAVING_ERROR',
          message: err.message,
        });
      }
    });
    FlowRouter.go(`/go/game/${game._id}`);
  },

  acceptRequest({Meteor, Store, FlowRouter}, game, acceptor) {
    const i18n = Store.getState().i18n;

    if (game.status!=="request"){
      return Store.dispatch({
        type: 'SET_SAVING_ERROR',
        message: i18n.MessageInvitationAcceptedAlready,
      });
    }

    if (!acceptor){
      return Store.dispatch({
        type: 'SET_SAVING_ERROR',
        message: i18n.MessageLoginFirstToAcceptInvitation,
      });
    }
    if (acceptor._id === game.blackId || acceptor._id === game.whiteId){
      return Store.dispatch({
        type: 'SET_SAVING_ERROR',
        message: i18n.MessageYouAcceptedInvitationAlready,
      });
    }

    let data = {};

    data.whiteId = game.creatorId === game.blackId?acceptor._id: game.whiteId;
    data.whiteName = game.creatorId === game.blackId?getUserIdentity(acceptor): game.whiteName;
    data.blackId = game.creatorId === game.whiteId?acceptor._id: game.blackId;
    data.blackName = game.creatorId === game.whiteId?getUserIdentity(acceptor): game.blackName;
    data.status = "accepted";
    data.position = game.creatorId === game.blackId?
      game.position.replace(/PW\[[^\]]*\]/g, 'PW['+data.whiteName+"]"):
      game.position.replace(/PB\[[^\]]*\]/g, 'PB['+data.blackName+"]");

    Meteor.call('gogames.accept', data, game._id, (err) => {
      if (err) {
        return Store.dispatch({
          type: 'SET_SAVING_ERROR',
          message: err.message,
        });
      }
    });

  },


  update({Meteor, Store, FlowRouter}, data, _id) {
    // console.log ('actions.users.update _id', _id);
    // console.log ('actions.users.update data', data);

    Meteor.call('gogames.update', data, _id, (err) => {
      if (err) {
        return Store.dispatch({
          type: 'SET_SAVING_ERROR',
          message: err.message,
        });
      }
    });
  },


  clearErrors({Store}) {
    return Store.dispatch({
      type: 'SET_SAVING_ERROR',
      message: null,
    });
  },

};
