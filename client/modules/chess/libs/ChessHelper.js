

const getStateFromPgn = (pgnContent, game) => {

  console.log("load ?", game.load_pgn(pgnContent));

  let header = game.header();

  let pgn = game.pgn();

  console.log("pgn", pgn);

  let gameMoves = pgn.replace(/\[(.*?)\]/gm, '').replace(header.Result, '').trim();

  console.log("gamemoves", gameMoves);

  //format the moves so each one is individually identified, so it can be highlighted
  let moveArray = gameMoves.split(/([0-9]+\.\s)/).filter(function(n) {return n;});

  console.log("moveArray", moveArray);

  for (let i = 0, l = moveArray.length; i < l; ++i) {
    var s = $.trim(moveArray[i]);
    if (!/^[0-9]+\.$/.test(s)) { //move numbers
      m = s.split(/\s+/);
      for (let j = 0, ll = m.length; j < ll; ++j) {
        m[j] = '<span class="gameMove' + (i + j - 1) + '"><a id="myLink" href="#" onclick="goToMove(' + (i + j - 1) + ');return false;">' + m[j] + '</a></span>';
      }
      s = m.join(' ');
    }
    moveArray[i] = s;
  }

  let gameHistory = game.history({verbose: true});

  console.log("gameHistory", gameHistory);

  return {
    pgn: pgnContent,

    moveArray: moveArray,

    stepCount: gameHistory.length,
    result: header.Result,

    blackName: header.Black,
    blackElo: header.BlackElo,

    whiteName: header.White,
    whiteElo: header.WhiteElo,

    event: header.Event,
    site: header.Site,
    eventDate: header.EventDate,

    gameHistory: gameHistory,

  };
};


export default {
  getStateFromPgn: getStateFromPgn,
};


