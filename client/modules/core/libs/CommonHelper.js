export const getGameStatusText = ( type, userId, game, i18n ) => {

  let statusText = "";

  let creatorName = game.creatorId === game.blackId?game.blackName:
    (game.creatorId === game.whiteId?game.whiteName:"");

  switch (game.status){
    case "request":
      if (game.creatorId === userId){
        statusText = i18n.MessageWaitingForFriendsAccept;
      }else if (userId){
        statusText = i18n.MessageYourFriendInvitingYou;
      }else{
        statusText = i18n.MessageWaitingForYouAccept;
      }
      break;
    case "accepted":
      if (game.creatorId === userId){
        if (userId === game.blackId){
          if (type==="go"){
            statusText = i18n.MessageYouFriendAcceptedYourInvitation+i18n.MessageWaitingForYouPlayBlack;
          }else{
            statusText = i18n.MessageYouFriendAcceptedYourInvitation+i18n.MessageWaitingForFriendPlayWhite;
          }
        }else{
          if (type==="go") {
            statusText = i18n.MessageYouFriendAcceptedYourInvitation+i18n.MessageWaitingForFriendPlayBlack;
          }else{
            statusText = i18n.MessageYouFriendAcceptedYourInvitation+i18n.MessageWaitingForYouPlayWhite;
          }
        }
      }else{
        if (userId === game.blackId){
          if(type==="go"){
            statusText = i18n.MessageYouAcceptedFriendInvitation+i18n.MessageWaitingForYouPlayBlack;
          }else{
            statusText = i18n.MessageYouAcceptedFriendInvitation+i18n.MessageWaitingForFriendPlayWhite;
          }
        }else if (userId === game.whiteId){
          if(type==="go") {
            statusText = i18n.MessageYouAcceptedFriendInvitation+i18n.MessageWaitingForFriendPlayBlack;
          }else{
            statusText = i18n.MessageYouAcceptedFriendInvitation+i18n.MessageWaitingForYouPlayWhite;
          }
        }else {
          if(type==="go") {
            statusText = i18n.MessageGameNotStartYet+i18n.MessageWaitingForBlackPlayFirst;
          }else{
            statusText = i18n.MessageGameNotStartYet+i18n.MessageWaitingForWhitePlayFirst;
          }
        }
      }
      break;

    case "playing":
      if (userId === game.blackId){
        if (game.turn === 0){
          statusText = i18n.MessageGameIsPlaying+i18n.MessageYourTurnToPlayBlack;
        }else{
          statusText = i18n.MessageGameIsPlaying+i18n.MessageFriendTurnToPlayWhite;
        }
      }else if (userId === game.whiteId){
        if (game.turn === 0){
          statusText = i18n.MessageGameIsPlaying+i18n.MessageFriendTurnToPlayBlack;
        }else{
          statusText = i18n.MessageGameIsPlaying+i18n.MessageYourTurnToPlayWhite;
        }
      }else{
        if (game.turn === 0){
          statusText = i18n.MessageGameIsPlaying+i18n.MessageBlackTurn;
        }else{
          statusText = i18n.MessageGameIsPlaying+i18n.MessageWhiteTurn;
        }
      }

    default:

  }

  return statusText;
};

