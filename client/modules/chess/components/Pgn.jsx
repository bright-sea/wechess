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
import ChessHelper from '../libs/ChessHelper.js';
import Device from '../../core/libs/Device.js';


export default class extends React.Component{

  constructor(props){
    super(props);

    console.log("pgncontent", props.pgn.content);

    this.game = new Chess();

    this.state= Object.assign(
      {
        stoneSound: true,
        orientation: "white",
        currentStep: 0,
        openDialog: false,
        autoPlay: false,
        comment: "",
      },
      ChessHelper.getStateFromPgn(props.pgn.content, this.game),
      Device.getDeviceLayout()
    );
  }

  handleOpenDialog() {
    this.setState({openDialog: true});
  }

  handleCloseDialog() {
    this.setState({openDialog: false});
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

  componentDidMount() {

    let elem = ReactDOM.findDOMNode(this.refs.board);

    var cfg = {
      pieceTheme: '/chess/img/chesspieces/wikipedia/{piece}.png',
      position: 'start',
      showNotation: false,
      onMoveEnd: (oldPos, newPos) => {
      }
    };
    this.board = new ChessBoard(elem, cfg);

    this.goToMove(0);

    window.addEventListener("resize", this.updateDimensions.bind(this));

  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    this.stopAutoPlay();
  }

  playStoneSound() {
    if (this.state.stoneSound) {
      if (!this._stoneSoundAudio) {
        this._stoneSoundAudio = new Audio('/sound/move.wav');
      }
      this._stoneSoundAudio.play();
    }
  }


  next() {
    if (this.state.currentStep < this.state.stepCount) {
      this.game.move(this.state.gameHistory[this.state.currentStep].san);
      this.board.position(this.game.fen());
      this.setState({currentStep: this.state.currentStep+1});
    }
  }

  previous() {
    if (this.state.currentStep > 0) {
      this.game.undo();
      this.board.position(this.game.fen());
      this.setState({currentStep: this.state.currentStep-1});
    }
  }

  last() {
    let currentStep = this.state.currentStep;

    while (currentStep < this.state.stepCount) {
      this.game.move(this.state.gameHistory[currentStep].san);
      currentStep++;
    }
    this.board.position(this.game.fen());
    this.setState({currentStep: currentStep});
  }

  first() {
    this.game.reset();
    this.board.position(this.game.fen());
    this.setState({currentStep: 0});
  }



//used for clickable moves in gametext
//not used for buttons for efficiency
  goToMove(ply) {
    if (ply > this.state.stepCount) ply = this.state.stepCount;

    this.game.reset();
    let i;

    for (i = 0; i < ply; i++) {
      this.game.move(this.state.gameHistory[i].san);
    }
    this.board.position(this.game.fen());

    this.setState({currentStep : i});
  }

  switchAutoPlay(){
    if(this.state.autoPlay) {
      this.stopAutoPlay();
    }else{
      this.autoPlay();
    }
  }


  autoPlay(){
    if (this._auto_play) return;
    this.playNextStep();
    this._auto_play = setInterval(this.playNextStep.bind(this), 2000);
    this.setState({autoPlay: true});
  }

  playNextStep() {
    if ( this.state.currentStep < this.state.stepCount) {
      this.next();
      this.playStoneSound();
    }else if (this.state.currentStep == this.state.stepCount){
      this.stopAutoPlay();
    }
  }


  stopAutoPlay() {
    if (this._auto_play){
      clearInterval(this._auto_play);
      delete this._auto_play;
    }
    this.setState({autoPlay: false});
  }

  switchStoneSound() {
    this.setState({stoneSound: !this.state.stoneSound});
  }

  switchOrientation() {
    this.board.flip();
    this.setState({orientation: (this.state.orientation == "white")?"black":"white"});
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

    };



    let getPlayerInfo = function() {

      return (
        <div style={{width:"100%"}}>
          <div style={styles.name}>
            <FontIcon className="fa fa-circle" style={styles.playerIcon}/>
            {this.state.blackName}
          </div>
          <div style={styles.rank}>
            {i18n.Elo}:{this.state.blackElo}
          </div>
          <div style={{clear:"both"}} />
          <div style={styles.name}>
            <FontIcon className="fa fa-circle-thin" style={styles.playerIcon}/>
            {this.state.whiteName}
          </div>
          <div style={styles.rank}>
            {i18n.Elo}:{this.state.whiteElo}
          </div>
        </div>
      );
    };

    let getControls = function() {

      return (
        <div style={{width:"100%"}}>
          <RaisedButton
            style={styles.controlButton}
            children = {<span/>}
            disabled={this.state.currentStep == 0}
            secondary={true}
            icon={<FontIcon className="fa fa-step-backward"/>}
            onTouchTap = {() => {this.stopAutoPlay(); this.first();}}/>
          <RaisedButton
            style={styles.controlButton}
            children = {<span/>}
            disabled={this.state.currentStep == 0}
            secondary={true}
            icon={<FontIcon className="fa fa-play fa-flip-horizontal"/>}
            onTouchTap = {() => {this.stopAutoPlay(); this.previous();}}/>
          <RaisedButton
            style={styles.controlButton}
            children = {<span/>}
            disabled={ this.state.currentStep == this.state.stepCount }
            secondary={true}
            icon={<FontIcon className="fa fa-play"/>}
            onTouchTap = {() => {
              this.stopAutoPlay();
              this.next();
              this.playStoneSound();
            }}/>
          <RaisedButton
            style={styles.controlButton}
            children = {<span/>}
            disabled={ this.state.currentStep == this.state.stepCount }
            secondary={true}
            icon={<FontIcon className="fa fa-step-forward"/>}
            onTouchTap = {() => {
              this.stopAutoPlay();
              this.last();
              this.playStoneSound();
              }}/>

          <RaisedButton
            style={styles.controlButton}
            label = {this.state.autoPlay?i18n.Stop:i18n.Auto}
            disabled={ this.state.currentStep == this.state.stepCount }
            secondary={true}
            onTouchTap = {this.switchAutoPlay.bind(this)}/>

          <RaisedButton
            style={styles.controlButton}
            label = {i18n.Info}
            secondary={true}
            onTouchTap = {this.handleOpenDialog.bind(this)}/>

          <div style={{marginLeft:3, float:"left", fontSize:"small"}}>
            <div style={{marginTop:3}}>
              {this.state.currentStep}/{this.state.stepCount}
            </div>
            <div style={{clear:"both"}} />
            <div style={{marginTop:-5}}>
              {this.state.result}
            </div>
          </div>
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
            <MenuItem onTouchTap={this.switchOrientation.bind(this)}>{i18n.RotateBoard}</MenuItem>
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
          <div> {i18n.Event}: {this.state.event} </div>
          <div> {i18n.Site}：{this.state.site} </div>
          <div> {i18n.EventDate}：{this.state.eventDate} </div>
        </Dialog>

      </div>
    );

  }

}




