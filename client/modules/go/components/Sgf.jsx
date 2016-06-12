import React from 'react';
import ReactDOM from 'react-dom';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';

import SgfHelper from '../libs/SgfHelper.js';
import Device from '../../core/libs/Device.js';
import ScoreMode from '../libs/ScoreMode.js';

export default class extends React.Component{

  constructor(props){
    super(props);

    this.state= Object.assign(
      {
        temp_marks: null,
        markLastMove: true,
        displayVariations: true,
        rememberPath: true,

        editMode: false,
        scoreMode: false,
        frozen: false,
        coordinate: false,
        stoneSound: true,
        openDialog: false,
        autoPlay: false,

        currentStep: 0,
        comment: "",
      },
      SgfHelper.getStateFromSgf(props.sgf.content),
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
      this.board.setWidth(layoutWidths.boardWidth);
    }
    this.setState(layoutWidths);
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    let elem = ReactDOM.findDOMNode(this.refs.board);

    this.kifuReader = new WGo.KifuReader(this.state.kifu, this.state.rememberPath, false);

    this.board = new WGo.Board(elem, {
      size: this.state.kifu.size,
      width: this.state.boardWidth,
    });

    //this.board.addEventListener("click", this.board_click_default.bind(this));

    this.board.removeAllObjects();
    this.update("init");

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


  update(op) {
    var e = {
      type: "update",
      op: op,
      target: this,
      node: this.kifuReader.node,
      position: this.kifuReader.getPosition(),
      path: this.kifuReader.path,
      change: this.kifuReader.change,
    };

    this.update_board(e);

    let newState ={};

    if(e.node.BL) newState.blackTime = SgfHelper.getPlayerTime(e.node.BL);
    if(e.node.WL) newState.whiteTime = SgfHelper.getPlayerTime(e.node.WL);
    if(e.position.capCount.black !== undefined) newState.blackCaps = e.position.capCount.black;
    if(e.position.capCount.white !== undefined) newState.whiteCaps = e.position.capCount.white;

    newState.currentStep = e.path.m || 0;

    newState.comment = e.node.comment || "";

    this.setState(newState);
  }


// basic updating function - handles board changes
  update_board (e) {
    // update board's position
    if(e.change) this.board.update(e.change);

    // remove old markers from the board
    if(this.state.temp_marks) this.board.removeObject(this.state.temp_marks);

    // init array for new objects
    var add = [];

    // add current move marker
    if(e.node.move  && this.state.markLastMove) {
      if(e.node.move.pass){

      }else{
        add.push({
          type: "CR",
          x: e.node.move.x,
          y: e.node.move.y
        });
      }
    }

    // add variation letters
    if(e.node.children.length > 1 && this.state.displayVariations) {
      for(let i = 0; i < e.node.children.length; i++) {
        if(e.node.children[i].move && !e.node.children[i].move.pass)	add.push({
          type: "LB",
          text: String.fromCharCode(65+i),
          x: e.node.children[i].move.x,
          y: e.node.children[i].move.y,
          c: this.board.theme.variationColor || "rgba(0,32,128,0.8)"
        });
      }
    }

    // add other markup
    if(e.node.markup) {
      for(let i in e.node.markup) {
        for(let j = 0; j < add.length; j++) {
          if(e.node.markup[i].x == add[j].x && e.node.markup[i].y == add[j].y) {
            add.splice(j,1);
            j--;
          }
        }
      }
      add = add.concat(e.node.markup);
    }

    // add new markers on the board
    this.state.temp_marks = add;
    this.board.addObject(add);
  }

  next(i) {
    if(this.state.frozen || !this.state.kifu) return;
    this.kifuReader.next(i);
    this.update();
  }

  previous() {
    if(this.state.frozen || !this.state.kifu) return;
    this.kifuReader.previous();
    this.update();
  }

  last() {
    if(this.state.frozen || !this.state.kifu) return;
    this.kifuReader.last();
    this.update();
  }

  first() {
    if(this.state.frozen || !this.state.kifu) return;
    this.kifuReader.first();
    this.update();
  }

  goTo(move) {
    if(this.state.frozen || !this.state.kifu) return;
    var path;
    if(typeof move == "function") move = move.call(this);

    if(typeof move == "number") {
      path = WGo.clone(this.kifuReader.path);
      path.m = move || 0;
    }
    else path = move;

    this.kifuReader.goTo(path);
    this.update();
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
    if (!this.state.frozen && this.state.currentStep < this.state.stepCount) {
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

  board_click_default(x,y) {
    if(!this.kifuReader || !this.kifuReader.node) return false;

    for(var i in this.kifuReader.node.children) {
      if(this.kifuReader.node.children[i].move && this.kifuReader.node.children[i].move.x == x && this.kifuReader.node.children[i].move.y == y) {
        this.next(i);
        return;
      }
    }

//    this.next();
  }

  switchStoneSound(){
    this.setState({stoneSound: !this.state.stoneSound});
  }

  switchCoordinate(){
    if(this.state.coordinate) {
      this.board.setSection(0, 0, 0, 0);
      this.board.removeCustomObject(WGo.Board.coordinates);
    }else{
      this.board.setSection(-0.5, -0.5, -0.5, -0.5);
      this.board.addCustomObject(WGo.Board.coordinates);
    }
    this.setState({coordinate: !this.state.coordinate});
  }

  switchEditMode() {
    this.stopAutoPlay();

    if(this.state.editMode) {

      this.originalReader.goTo(this.kifuReader.path);

      // change object isn't actual - update it, not elegant solution, but simple
      this.originalReader.change = SgfHelper.pos_diff(this.kifuReader.getPosition(), this.originalReader.getPosition());

      // update kifu reader
      this.kifuReader = this.originalReader;
      this.update(true);

      // remove edit listeners
      this.board.removeEventListener("click", this._ev_click);
      this.board.removeEventListener("mousemove", this._ev_move);
      this.board.removeEventListener("mouseout", this._ev_out);
    }else{

      // save original kifu reader
      this.originalReader = this.kifuReader;

      let newKifu = this.state.kifu.clone();

      // create new reader with cloned kifu
      this.kifuReader = new WGo.KifuReader(newKifu, this.originalReader.rememberPath, this.originalReader.allow_illegal);

      // go to current position
      this.kifuReader.goTo(this.originalReader.path);

      this.update();

      // register edit listeners
      this._ev_click = this._ev_click || this.play.bind(this);
      this._ev_move = this._ev_move || this.edit_board_mouse_move.bind(this);
      this._ev_out = this._ev_out || this.edit_board_mouse_out.bind(this);


      this.board.addEventListener("click", this._ev_click);
      this.board.addEventListener("mousemove", this._ev_move);
      this.board.addEventListener("mouseout", this._ev_out);
    }
    this.setState({editMode: !this.state.editMode});

  }

  switchScoreMode() {
    this.stopAutoPlay();

    let comment;

    if(this.state.scoreMode) {
      this._score_mode.end();
      delete this._score_mode;

      comment = this._originComment || "";
    }else{
      this._score_mode = new ScoreMode(this.kifuReader.game.position, this.board, this.state.kifu.info.KM || 0.5, this.notification.bind(this));
      this._score_mode.start();

      this._originComment = this.state.comment;
      comment = "点击棋子将它们标记为死子或活子，您也可以通过点击来设置或者取消设置一个区域的空，区域的空必须是完全围起来的。";

    }
    this.setState({
      scoreMode: !this.state.scoreMode,
      frozen: !this.state.frozen,
      comment: comment,
    });

  }

  notification (msg){
    this.setState({comment:msg});
  }

// board mousemove callback for edit move - adds highlighting
  edit_board_mouse_move(x,y) {
    if(this.state.frozen || (this._lastX == x && this._lastY == y)) return;

    this._lastX = x;
    this._lastY = y;

    if(this._last_mark) {
      this.board.removeObject(this._last_mark);
    }

    if(x != -1 && y != -1 && this.kifuReader.game.isValid(x,y)) {
      this._last_mark = {
        type: "outline",
        x: x,
        y: y,
        c: this.kifuReader.game.turn
      };
      this.board.addObject(this._last_mark);
    }
    else {
      delete this._last_mark;
    }
  }

// board mouseout callback for edit move
  edit_board_mouse_out() {
    if(this._last_mark) {
      this.board.removeObject(this._last_mark);
      delete this._last_mark;
      delete this._lastX;
      delete this._lastY;
    }
  }

  play(x,y) {
    if(this.state.frozen || !this.kifuReader.game.isValid(x, y)) return;

    this.kifuReader.node.appendChild(new WGo.KNode({
      move: {
        x: x,
        y: y,
        c: this.kifuReader.game.turn
      },
      _edited: true
    }));
    this.next(this.kifuReader.node.children.length-1);
    this.playStoneSound();
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
            {i18n.rank}:{this.state.blackRank}
          </div>
          <div style={styles.rank}>
            {i18n.caps}:{this.state.blackCaps}
          </div>
          <div style={styles.rank}>
            {i18n.time}:{this.state.blackTime}
          </div>
          <div style={{clear:"both"}} />
          <div style={styles.name}>
            <FontIcon className="fa fa-circle-thin" style={styles.playerIcon}/>
            {this.state.whiteName}
          </div>
          <div style={styles.rank}>
            {i18n.rank}:{this.state.whiteRank}
          </div>
          <div style={styles.rank}>
            {i18n.caps}:{this.state.whiteCaps}
          </div>
          <div style={styles.rank}>
            {i18n.time}:{this.state.whiteTime}
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
            disabled={this.state.frozen || !(this.kifuReader&&this.kifuReader.node.parent)}
            secondary={true}
            icon={<FontIcon className="fa fa-step-backward"/>}
            onTouchTap = {() => {this.stopAutoPlay(); this.first();}}/>
          <RaisedButton
            style={styles.controlButton}
            children = {<span/>}
            disabled={this.state.frozen || !(this.kifuReader&&this.kifuReader.node.parent)}
            secondary={true}
            icon={<FontIcon className="fa fa-backward"/>}
            onTouchTap = {() => {
                this.stopAutoPlay();
                let p = WGo.clone(this.kifuReader.path);
                p.m -= 10;
                this.goTo(p);
              }}/>
          <RaisedButton
            style={styles.controlButton}
            children = {<span/>}
            disabled={this.state.frozen || !(this.kifuReader&&this.kifuReader.node.parent)}
            secondary={true}
            icon={<FontIcon className="fa fa-play fa-flip-horizontal"/>}
            onTouchTap = {() => {this.stopAutoPlay(); this.previous();}}/>
          <RaisedButton
            style={styles.controlButton}
            children = {<span/>}
            disabled={this.state.frozen ||  this.state.currentStep == this.state.stepCount }
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
            disabled={this.state.frozen ||  this.state.currentStep == this.state.stepCount }
            secondary={true}
            icon={<FontIcon className="fa fa-forward"/>}
            onTouchTap = {() => {
                this.stopAutoPlay();
                let p = WGo.clone(this.kifuReader.path);
                p.m += 10;
                this.goTo(p);
                this.playStoneSound();
              }}/>
          <RaisedButton
            style={styles.controlButton}
            children = {<span/>}
            disabled={this.state.frozen ||  this.state.currentStep == this.state.stepCount }
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
            disabled={this.state.frozen || this.state.editMode || this.state.currentStep == this.state.stepCount }
            secondary={true}
            onTouchTap = {this.switchAutoPlay.bind(this)}/>

          <RaisedButton
            style={styles.controlButton}
            disabled ={this.state.frozen }
            label = {this.state.editMode?i18n.Restore:i18n.Study}
            secondary={true}
            onTouchTap = {this.switchEditMode.bind(this)}/>
          <RaisedButton
            style={styles.controlButton}
            disabled ={false }
            label = {this.state.scoreMode?i18n.Continue:i18n.Count}
            secondary={true}
            onTouchTap = {this.switchScoreMode.bind(this)}/>
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
            <MenuItem onTouchTap={this.switchCoordinate.bind(this)}>{this.state.coordinate?i18n.HideCoordinate:i18n.ShowCoordinate}</MenuItem>
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
            Object.keys(this.state.gameInfo).map( key => (
              <div key={key}>
                <span>{key} </span>
                {this.state.gameInfo[key]}
              </div>
            ))
          }
        </Dialog>
      </div>
    )
  }

}



