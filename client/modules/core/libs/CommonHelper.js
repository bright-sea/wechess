export const getGameStatusText = ( type, userId, game ) => {

  let statusText = "";

  let creatorName = game.creatorId === game.blackId?game.blackName:
    (game.creatorId === game.whiteId?game.whiteName:"");

  switch (game.status){
    case "request":
      if (game.creatorId === userId){
        statusText = "您创建了此局，正在等待友人加入对局。";
      }else if (userId){
        statusText = `您的朋友${creatorName}邀请您进行此对局。`;
      }else{
        statusText = `您的朋友${creatorName}创建了此局，请登录后接收邀请。`;
      }
      break;
    case "accepted":
      if (game.creatorId === userId){
        if (userId === game.blackId){
          if (type==="go"){
            statusText = `您的朋友${game.whiteName}已经接受了您的对局邀请，请您执黑先行。`;
          }else{
            statusText = `您的朋友${game.whiteName}已经接受了您的对局邀请，请等待朋友执白先行。`;
          }
        }else{
          if (type==="go") {
            statusText = `您的朋友${game.blackName}已经接受了您的对局邀请，请等待朋友执黑先行。`;
          }else{
            statusText = `您的朋友${game.blackName}已经接受了您的对局邀请，请您执白先行。`;
          }
        }
      }else{
        if (userId === game.blackId){
          if(type==="go"){
            statusText = `您已经接受了朋友${game.whiteName}的对局邀请，请您执黑先行。`;
          }else{
            statusText = `您已经接受了朋友${game.whiteName}的对局邀请，请等待朋友执白先行。`;
          }
        }else if (userId === game.whiteId){
          if(type==="go") {
            statusText = `您已经接受了朋友${game.blackName}的对局邀请，请等待朋友执黑先行。`;
          }else{
            statusText = `您已经接受了朋友${game.blackName}的对局邀请，请您执白先行。`;
          }
        }else {
          if(type==="go") {
            statusText = `对局尚未正式开始，正在等待黑方先行。`;
          }else{
            statusText = `对局尚未正式开始，正在等待白方先行。`;
          }
        }
      }
      break;

    case "playing":
      if (userId === game.blackId){
        if (game.turn === 0){
          statusText = `对局正在进行中，轮到您下黑棋。`;
        }else{
          statusText = `对局正在进行中，轮到对方下白棋。`;
        }
      }else if (userId === game.whiteId){
        if (game.turn === 0){
          statusText = `对局正在进行中，轮到对方下黑棋。`;
        }else{
          statusText = `对局正在进行中，轮到您下白棋。`;
        }
      }else{
        if (game.turn === 0){
          statusText = `对局正在进行中，轮到黑棋。`;
        }else{
          statusText = `对局正在进行中，轮到白棋。`;
        }
      }

    default:

  }

  return statusText;
};

