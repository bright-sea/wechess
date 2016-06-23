import React from 'react';
import ReactDOM from 'react-dom';

import styles from '../../../libs/styles.js';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import {Chess} from 'chess.js';
import ChessHelper from '../libs/ChessHelper.js';
import {getGameStatusText} from '../../core/libs/CommonHelper.js';


const getStatesFromProps = (props) =>{
  const game = props.game;

  return {
    color: props.userId == game.blackId?"b":
      (props.userId == game.whiteId?"w":""),
    editMode: ((game.status === "accepted" || game.status === "playing") &&
    (game.turn?props.userId == game.whiteId: props.userId == game.blackId)),
    creatorId: game.creatorId,
    turn: game.turn,
    position: game.position,
    status: game.status,
    statusText: getGameStatusText("chess", props.userId, game, props.i18n),

    blackName: game.blackName,
    whiteName: game.whiteName,
  };
};



export default class extends React.Component{

  constructor(props){
    super(props);

    this.state= Object.assign(
      {
        comment: "",
      },
      getStatesFromProps(props)
    );

    this.game = this.state.position? new Chess(this.state.position) : new Chess();
  }

  createChessBoard(state) {
    let elem = ReactDOM.findDOMNode(this.refs.board);

    var cfg = {
      pieceTheme: '/chess/img/chesspieces/wikipedia/{piece}.png',
      draggable: true,
      showNotation: false,
      orientation: state.color === "b"?"black":"white",
      position: state.position ? state.position : 'start',
      onDragStart: this.onDragStart.bind(this),
      onDrop: this.onDrop.bind(this),
      onSnapEnd: this.onSnapEnd.bind(this),
    };
    this.board = new ChessBoard(elem, cfg);
  }

  componentDidMount() {

    this.createChessBoard(this.state);

    window.addEventListener("resize", this.props.changeDeviceLayoutAction);

  }

  componentWillReceiveProps(nextProps){

    this.board.resize();

    let newState = getStatesFromProps(nextProps);

    if (newState.status==="request" || newState.status==="accepted"){
      this.createChessBoard(newState);
      this.game.load(newState.position);
    }else{
      this.game.load(newState.position);
      this.board.position(this.game.fen());
    }

    this.setState(newState);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.props.changeDeviceLayoutAction);
  }

  playStoneSound() {
    if (this.props.stoneSound) {
      if (!this._stoneSoundAudio) {
        this._stoneSoundAudio = new Audio('/sound/move.wav');
      }
      this._stoneSoundAudio.play();
    }
  }

  // do not pick up pieces if the game is over
  // only pick up pieces for the side to move
  onDragStart(source, piece, position, orientation) {
    if (this.game.game_over() === true ||
      (this.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (this.game.turn() === 'b' && piece.search(/^w/) !== -1) ||
      (this.game.turn() !== this.state.color)) {
      return false;
    }
  }

  onDrop(source, target) {
    // see if the move is legal
    var move = this.game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) {
      return 'snapback';
    } else {
      this.moveAction(move, this.game.fen());
//      socket.emit('move', {move: move, gameId: serverGame.id, board: game.fen()});
    }
  }

  // update the board position after the piece snap
  // for castling, en passant, pawn promotion
  onSnapEnd() {
    this.board.position(this.game.fen());
  }

  moveAction(move, position) {
    this.props.moveAction({
      turn: this.state.turn === 0 ? 1:0,
      move: move,
      position: position
    }, this.props.game._id);
  }

  render() {
    const {i18n, deviceLayout} = this.props;

    let localStyles ={
      board: {
        width: deviceLayout.boardWidth,
        float: "left",
      },
      info: {
        width: deviceLayout.layout == "portrait" ?
          deviceLayout.boardWidth : deviceLayout.infoWidth,
        float: "left",
      },
    };


    let getPlayerInfo = function() {

      return (
        <div style={{width:"100%"}}>
          <div>
            <div style={styles.alert}>{this.state.statusText}</div>
            <div style={{clear:"both"}} />
            {this.state.status === "request" && this.state.creatorId === this.props.userId?
              <FlatButton
                style={styles.labelButton}
                label={i18n.SendInvitation}
                primary={true}
                onTouchTap = {this.props.openDialogAction.bind(null, false, "invitation",
                    {gameUrl: this.props.gameUrl, gameType: "chess"})}/>
              :null
            }
            {this.state.status === "request" && this.state.creatorId !== this.props.userId && this.props.userId?
              <FlatButton
                style={styles.labelButton}
                label={i18n.AcceptInvitation}
                primary={true}
                onTouchTap = {() => {this.props.acceptRequest(this.props.game, this.props.user);}}/>
              :null
            }
            {this.state.status === "request" && !this.props.userId?
              <FlatButton
                primary={true}
                label={i18n.Login}
                icon={<FontIcon className="fa fa-sign-in"/>}
                onTouchTap={this.props.openDialogAction.bind(null, false, "login")}
              />
              :null
            }
          </div>

          <div style={{clear:"both"}} />

          <div style={styles.name}>
            <FontIcon className="fa fa-circle" style={styles.playerIcon}/>
            {this.state.blackName}
          </div>
          {this.state.turn ===1? <FontIcon className="fa fa-hand-o-left" style={styles.playerIcon}/>:null}
          <div style={{clear:"both"}} />
          <div style={styles.name}>
            <FontIcon className="fa fa-circle-thin" style={styles.playerIcon}/>
            {this.state.whiteName}
          </div>
          {this.state.turn ===0? <FontIcon className="fa fa-hand-o-left" style={styles.playerIcon}/>:null}
        </div>
      );
    };

    let getControls = function() {

      return (
        <div style={{width:"100%"}}>
        </div>
      );
    };

    let getComment = function() {

      return (
        <div style={{width:"100%"}}>
          <div style={styles.comment}>
            {this.state.comment}
          </div>
        </div>
      );
    };


    return (
      <div>
        <div style={localStyles.info}>
          {deviceLayout.layout == "portrait"? getPlayerInfo.bind(this)(): null}
        </div>
        <div style={localStyles.board} ref="board" />
        <div style={localStyles.info}>
          {deviceLayout.layout != "portrait"? getPlayerInfo.bind(this)(): null}
          <div style={{clear:"both"}} />
          { getControls.bind(this)() }
          <div style={{clear:"both"}} />
          { getComment.bind(this)() }
        </div>

        <div style={localStyles.info}>
          <Card
            initiallyExpanded={false}
          >
            <CardHeader
              title={i18n.GameInfo}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText
              expandable={true}
            >
              <div> {i18n.Event}: {this.state.event} </div>
              <div> {i18n.Site}：{this.state.site} </div>
              <div> {i18n.EventDate}：{this.state.eventDate} </div>
            </CardText>
          </Card>
        </div>
      </div>
    );

  }

}




