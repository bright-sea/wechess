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
    game.turn = 1;      //chess game white first
    game.moves = [];
    game.position = "";
    game.status = "request";

    console.log("order", order);
    console.log("game", game);



    Meteor.call('chessgames.create', game, (err) => {
      if (err) {
        return Store.dispatch({
          type: 'SET_SAVING_ERROR',
          message: err.message,
        });
      }
    });
    FlowRouter.go(`/chess/game/${game._id}`);
  },

  invitation({Meteor, Store, FlowRouter}, email, gameUrl, invitator, callback) {
    const i18n = Store.getState().i18n;

    if (!email) {
      return Store.dispatch({
        type: 'SET_INVITATION_ERROR',
        message: i18n.MessageEmptyEmail,
      });
    }

    if (!gameUrl) {
      return Store.dispatch({
        type: 'SET_INVITATION_ERROR',
        message: i18n.MessageEmptyGameLink,
      });
    }

    if (!invitator) {
      return Store.dispatch({
        type: 'SET_INVITATION_ERROR',
        message: i18n.MessageEmptyInviter,
      });
    }

    Store.dispatch({
      type: 'SET_INVITATION_ERROR',
      message: null,
    });

    let data = {
      email: email,
      gameUrl: gameUrl,
      invitator: getUserIdentity(invitator),
      gameType: "chess"
    };

    Meteor.call( 'sendGameInvitation', data, ( error, response ) => {

      if ( error ) {
        return Store.dispatch({
          type: 'SET_INVITATION_ERROR',
          message: error.reason,
        });
      } else {
        Bert.alert( i18n.MessageInvitationSentSuccessfully, 'success' );
        if (callback){
          callback.apply();
        }
      }
    });

  },

  invitationErrorClear({Store}) {
    return Store.dispatch({
      type: 'SET_INVITATION_ERROR',
      message: null,
    });
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
    data.position = "";

    Meteor.call('chessgames.accept', data, game._id, (err) => {
      if (err) {
        return Store.dispatch({
          type: 'SET_SAVING_ERROR',
          message: err.message,
        });
      }
    });

  },


  update({Meteor, Store, FlowRouter}, data, _id) {

    Meteor.call('chessgames.update', data, _id, (err) => {
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
