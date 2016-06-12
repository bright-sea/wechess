import React from 'react';
import ReactDOM from 'react-dom';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';

import {Chess} from 'chess.js';
import Device from '../../core/libs/Device.js';
import ChessHelper from '../libs/ChessHelper.js';
import {getGameStatusText} from '../../core/libs/CommonHelper.js';


import Invitation from '../../core/components/Invitation.jsx';


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
    statusText: getGameStatusText("chess", props.userId, game),

    blackName: game.blackName,
    whiteName: game.whiteName,
  };
};



export default class extends React.Component{

  constructor(props){
    super(props);

    this.state= Object.assign(
      {
        stoneSound: true,
        openDialog: false,
        dialogType: "",
        comment: "",
      },
      getStatesFromProps(props),
      Device.getDeviceLayout()
    );

    this.game = this.state.position? new Chess(this.state.position) : new Chess();
  }

  handleOpenDialog(type) {
    this.setState({
      openDialog: true,
      dialogType: type,
    });
  }

  handleCloseDialog() {
    this.setState({openDialog: false});
  }

  handleInvitationSubmit(email) {
    this.props.submitInvitationAction(email, this.props.gameUrl, this.props.user,
      this.handleCloseDialog.bind(this));
  }


  updateDimensions() {

    const layoutWidths = Device.getDeviceLayout();

    if (this.board){
      this.board.resize();
    }
    this.setState(layoutWidths);
  }

  componentWillMount() {
    this.updateDimensions();
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

    window.addEventListener("resize", this.updateDimensions.bind(this));

  }

  componentWillReceiveProps(nextProps){

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
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  playStoneSound() {
    if (this.state.stoneSound) {
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

  switchStoneSound() {
    this.setState({stoneSound: !this.state.stoneSound});
  }



  render() {
    const {i18n} = this.props;

    let styles ={
      board: {
        width: this.state.boardWidth,
        float: "left",
      },
      info: {
        width: this.state.layout == "portrait" ? this.state.boardWidth : this.state.infoWidth,
        float: "left",
      },
      playerIcon: {
        float:'left',
        margin:"3px 3px 0 3px",
      },
      name: {
        float:'left',
        fontWeight:'bold',
        fontSize:"large",
      },
      rank: {
        float:'left',
        fontSize:'small',
        marginTop: 4,
        marginLeft:8,
      },
      controlButton: {
        marginTop: 3,
        marginLeft:3,
        marginRight:2,
        marginBottom:2,
        minWidth:37,
        float:"left",
      },
      comment: {
        padding:3,
        float:'left',
        fontSize:'small',
      },
      dialog: {
        padding:5,
      },
      alert: {
        color: "red",
        float: "left",
      },

    };


    let getPlayerInfo = function() {

      return (
        <div style={{width:"100%"}}>
          <div>
            <span style={styles.alert}>{this.state.statusText}</span>
            {this.state.status === "request" && this.state.creatorId === this.props.userId?
              <RaisedButton
                style={styles.controlButton}
                label={i18n.SendInvitation}
                secondary={true}
                onTouchTap = {this.handleOpenDialog.bind(this, "invitation")}/>
              :null
            }
            {this.state.status === "request" && this.state.creatorId !== this.props.userId && this.props.userId?
              <RaisedButton
                style={styles.controlButton}
                label={i18n.AcceptInvitation}
                secondary={true}
                onTouchTap = {() => {this.props.acceptRequest(this.props.game, this.props.user);}}/>
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
          <IconMenu
            style={{float:'left'}}
            iconButtonElement={
                <IconButton><FontIcon className="fa fa-bars"
                  color="#00bcd4"
                  hoverColor="green"
                /></IconButton>
              }
            targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          >
            <MenuItem onTouchTap={this.switchStoneSound.bind(this)}>{this.state.stoneSound?i18n.SoundOff:i18n.SoundOn}</MenuItem>
          </IconMenu>

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
        <div style={styles.info}>
          {this.state.layout == "portrait"? getPlayerInfo.bind(this)(): null}
        </div>
        <div style={styles.board} ref="board" />
        <div style={styles.info}>
          {this.state.layout != "portrait"? getPlayerInfo.bind(this)(): null}
          <div style={{clear:"both"}} />
          { getControls.bind(this)() }
          <div style={{clear:"both"}} />
          { getComment.bind(this)() }
        </div>
        <Dialog
          actions={[]}
          modal={false}
          bodyStyle={styles.dialog}
          open={this.state.openDialog}
          autoScrollBodyContent={true}
          onRequestClose={this.handleCloseDialog.bind(this)}
        >
          {
            this.state.dialogType == "info" ?
            <div>
              <h3>{i18n.GameInfo}</h3>
              <div> {i18n.Event}: {this.state.event} </div>
              <div> {i18n.Site}：{this.state.site} </div>
              <div> {i18n.EventDate}：{this.state.eventDate} </div>
            </div>: (
              this.state.dialogType == "invitation"?
              <Invitation {...this.props}
                handleInvitationSubmit={this.handleInvitationSubmit.bind(this)}
              />:
              <div/>
            )
          }

        </Dialog>

      </div>
    );

  }

}




