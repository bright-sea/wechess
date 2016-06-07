const getPlayerTime = (time) => {
  var min = Math.floor(time/60);
  var sec = Math.round(time)%60;
  return min+":"+((sec < 10) ? "0"+sec : sec);
};


const getStateFromSgf = (sgfContent) => {

  const kifu = WGo.Kifu.fromSgf(sgfContent);

  console.log("kifu", kifu);

  const info = kifu.info || {};

  let blackName, blackRank, blackCaps, blackTime,
    whiteName, whiteRank, whiteCaps, whiteTime;

  if(info.black) {
    blackName = WGo.filterHTML(info.black.name) || "";
    blackRank  = WGo.filterHTML(info.black.rank) || "-";
  }else {
    blackName = "";
    blackRank = "-";
  }
  if(info.white) {
    whiteName = WGo.filterHTML(info.white.name) || "";
    whiteRank = WGo.filterHTML(info.white.rank) || "-";
  }else {
    whiteName = "";
    whiteRank = "-";
  }

  blackCaps = "0";
  whiteCaps = "0";

  if(info.TM) {
    blackTime = getPlayerTime(info.TM);
    whiteTime = getPlayerTime(info.TM);
  }else {
    blackTime = "--:--";
    whiteTime = "--:--";
  }

  const gameInfo = {};
  for(let key in kifu.info) {
    if(WGo.Kifu.infoList.indexOf(key) == -1) continue;
    if (key=="RE") continue;

    if(WGo.Kifu.infoFormatters[key]) {
      gameInfo[WGo.t(key)] = WGo.Kifu.infoFormatters[key](kifu.info[key]);
    }
    else gameInfo[WGo.t(key)] = WGo.filterHTML(kifu.info[key]);
  }

  let resultText = "";
  let result = kifu.info['RE'];

  if (result){
    if (result.startsWith('B+')){
      let number = result.substring(2);
      if (number.startsWith('R')){
        resultText = "黑中盘胜";
      }else{
        resultText = "黑胜"+number+"目";
      }
    }else if (result.startsWith('W+')){
      let number = result.substring(2);
      if (number.startsWith('R')){
        resultText = "白中盘胜";
      }else{
        resultText = "白胜"+number+"目";
      }
    }else{
      resultText = result;
    }
  }

  let stepCount = 0;
  let node = kifu.root;

  while (node && node.children && node.children.length >0){
    stepCount ++;
    node = node.children[0];
  }

  return {
    kifu: kifu,
    stepCount: stepCount,
    result: resultText,

    blackName: blackName,
    blackRank: blackRank,
    blackCaps: blackCaps,
    blackTime: blackTime,

    whiteName: whiteName,
    whiteRank: whiteRank,
    whiteCaps: whiteCaps,
    whiteTime: whiteTime,

    gameInfo: gameInfo,
  };
};


// get differences of two positions as a change object (TODO create a better solution, without need of this function)
const pos_diff = (old_p, new_p) => {
  var size = old_p.size, add = [], remove = [];

  for(var i = 0; i < size*size; i++) {
    if(old_p.schema[i] && !new_p.schema[i]) remove.push({x:Math.floor(i/size),y:i%size});
    else if(old_p.schema[i] != new_p.schema[i]) add.push({x:Math.floor(i/size),y:i%size,c:new_p.schema[i]});
  }

  return {
    add: add,
    remove: remove
  }
};


export default {
  getPlayerTime: getPlayerTime,
  getStateFromSgf: getStateFromSgf,
  pos_diff: pos_diff,
};


