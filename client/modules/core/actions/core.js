import {getUserIdentity} from '../../../../lib/utility';

export default {

  switchLocale({Store}, locale) {
    Store.dispatch({
      type: 'SWITCH_LOCALE',
      locale,
    });
  },

  switchStoneSound({Store}, stoneSound) {
    Store.dispatch({
      type: 'SWITCH_STONESOUND',
      stoneSound,
    });
  },

  openDialog({Store}, modal, dialogType, payload) {
    Store.dispatch({
      type: 'OPEN_DIALOG',
      modal,
      dialogType,
      payload,
    });
  },

  closeDialog({Store}) {
    Store.dispatch({
      type: 'CLOSE_DIALOG',
    });
  },


  invitation({Meteor, Store, FlowRouter}, email, gameUrl, gameType, invitator, callback) {
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
      gameType: gameType,
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


};
