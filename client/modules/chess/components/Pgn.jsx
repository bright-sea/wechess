import React from 'react';
import ReactDOM from 'react-dom';

import styles from '../../../libs/styles.js';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {cyan500} from 'material-ui/styles/colors';

import {Tabs, Tab} from 'material-ui/Tabs';

import {Chess} from 'chess.js';
import ChessHelper from '../libs/ChessHelper.js';


export default class extends React.Component{

  constructor(props){
    super(props);

    this.game = new Chess();

    this.state= Object.assign(
      {
        orientation: "white",
        currentStep: 0,
        autoPlay: false,
        comment: "",
      },
      ChessHelper.getStateFromPgn(props.pgn.content, this.game)
    );
  }

  componentWillReceiveProps(nextProps) {
    this.board.resize();
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

    window.addEventListener("resize", this.props.changeDeviceLayoutAction);

  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.props.changeDeviceLayoutAction);
    this.stopAutoPlay();
  }

  playStoneSound() {
    if (this.props.stoneSound) {
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

  switchOrientation() {
    this.board.flip();
    this.setState({orientation: (this.state.orientation == "white")?"black":"white"});
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
          <IconButton
            style={styles.controlButton}
            disabled={this.state.currentStep == 0}
            onTouchTap = {() => {this.stopAutoPlay(); this.first();}}
          >
            <FontIcon className="fa fa-step-backward" color={cyan500} />
          </IconButton>

          <IconButton
            style={styles.controlButton}
            disabled={this.state.currentStep == 0}
            onTouchTap = {() => {this.stopAutoPlay(); this.previous();}}
          >
            <FontIcon className="fa fa-play fa-flip-horizontal" color={cyan500} />
          </IconButton>

          <IconButton
            style={styles.controlButton}
            disabled={ this.state.currentStep == this.state.stepCount }
            onTouchTap = {() => {
              this.stopAutoPlay();
              this.next();
              this.playStoneSound();
            }}
          >
            <FontIcon className="fa fa-play" color={cyan500} />
          </IconButton>

          <IconButton
            style={styles.controlButton}
            disabled={ this.state.currentStep == this.state.stepCount }
            onTouchTap = {() => {
              this.stopAutoPlay();
              this.last();
              this.playStoneSound();
            }}
          >
            <FontIcon className="fa fa-step-forward" color={cyan500} />
          </IconButton>

          <div style={{marginLeft:3, float:"left", fontSize:"small"}}>
            <div style={{marginTop:-3}}>
              {this.state.currentStep}/{this.state.stepCount}
            </div>
            <div style={{clear:"both"}} />
            <div style={{marginTop:-9}}>
              {this.state.result}
            </div>
          </div>

          <FlatButton
            style={styles.labelButton}
            label = {this.state.autoPlay?i18n.Stop:i18n.Auto}
            labelStyle={styles.labelSpan}
            disabled={ this.state.currentStep == this.state.stepCount }
            primary={true}
            onTouchTap = {this.switchAutoPlay.bind(this)}/>

          <FlatButton
            style={styles.labelButton}
            label = {i18n.RotateBoard}
            labelStyle={styles.labelSpan}
            primary={true}
            onTouchTap = {this.switchOrientation.bind(this)}/>
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
        </div>

        <div style={localStyles.info}>
          <Tabs tabItemContainerStyle={styles.tabsItem}>
            <Tab label={i18n.comments} style={styles.tabLabel}>
              { getComment.bind(this)() }
            </Tab>
            <Tab label={i18n.GameInfo} style={styles.tabLabel} >
              <div> {i18n.Event}: {this.state.event} </div>
              <div> {i18n.Site}：{this.state.site} </div>
              <div> {i18n.EventDate}：{this.state.eventDate} </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    );

  }

}




