import React from 'react';
import ReactDOM from 'react-dom';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import SgfHelper from '../libs/SgfHelper.js';
import {getGameStatusText} from '../../core/libs/CommonHelper.js';


const getStatesFromProps = (props) =>{
  const game = props.game;

  return Object.assign(
    {
      color: props.userId == game.blackId?"b":
        (props.userId == game.whiteId?"w":""),
      editMode: ((game.status === "accepted" || game.status === "playing") &&
        (game.turn?props.userId == game.whiteId: props.userId == game.blackId)),
      creatorId: game.creatorId,
      turn: game.turn,
      position: game.position,
      status: game.status,
      statusText: getGameStatusText("go", props.userId, game, props.i18n),
    },
    SgfHelper.getStateFromSgf(game.position)
  );
};



export default class extends React.Component{

  constructor(props){
    super(props);

    this.state= Object.assign(
      {
        temp_marks: null,
        markLastMove: true,
        displayVariations: true,
        rememberPath: true,

        comment: "",
      },
      getStatesFromProps(props)
    );
  }

  componentDidMount() {
    let elem = ReactDOM.findDOMNode(this.refs.board);

    this.kifuReader = new WGo.KifuReader(this.state.kifu, this.state.rememberPath, false);

    this.board = new WGo.Board(elem, {
      size: this.state.kifu.size,
      width: this.props.deviceLayout.boardWidth,
    });

    //this.board.addEventListener("click", this.board_click_default.bind(this));

    //this.board.removeAllObjects();
    //this.update("init");

    this.kifuReader.last();
    this.update();


    if(this.state.editMode){
      // register edit listeners
      this._ev_click = this._ev_click || this.play.bind(this);
      this._ev_move = this._ev_move || this.edit_board_mouse_move.bind(this);
      this._ev_out = this._ev_out || this.edit_board_mouse_out.bind(this);

      this.board.addEventListener("click", this._ev_click);
      this.board.addEventListener("mousemove", this._ev_move);
      this.board.addEventListener("mouseout", this._ev_out);
    }

    window.addEventListener("resize", this.props.changeDeviceLayoutAction);
  }

  componentWillReceiveProps(nextProps){

    this.board.setWidth(nextProps.deviceLayout.boardWidth);

    let newState = getStatesFromProps(nextProps);

    this.kifuReader = new WGo.KifuReader(newState.kifu, newState.rememberPath, false);

    this.setState(newState);

    this.kifuReader.last();
    this.update();

    if(newState.editMode){
      // register edit listeners
      this._ev_click = this._ev_click || this.play.bind(this);
      this._ev_move = this._ev_move || this.edit_board_mouse_move.bind(this);
      this._ev_out = this._ev_out || this.edit_board_mouse_out.bind(this);

      this.board.addEventListener("click", this._ev_click);
      this.board.addEventListener("mousemove", this._ev_move);
      this.board.addEventListener("mouseout", this._ev_out);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.props.changeDeviceLayoutAction);
  }


  setEditModeEvent(editMode) {
    if(!editMode) {
      // remove edit listeners
      if (this._ev_click) this.board.removeEventListener("click", this._ev_click);
      if (this._ev_move) this.board.removeEventListener("mousemove", this._ev_move);
      if (this._ev_out) this.board.removeEventListener("mouseout", this._ev_out);
    }else{
      // register edit listeners
      this._ev_click = this._ev_click || this.play.bind(this);
      this._ev_move = this._ev_move || this.edit_board_mouse_move.bind(this);
      this._ev_out = this._ev_out || this.edit_board_mouse_out.bind(this);

      this.board.addEventListener("click", this._ev_click);
      this.board.addEventListener("mousemove", this._ev_move);
      this.board.addEventListener("mouseout", this._ev_out);
    }
  }


  playStoneSound() {
    if (this.props.stoneSound) {
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

    let move = {
      x: x,
      y: y,
      c: this.kifuReader.game.turn
    };

    this.kifuReader.node.appendChild(new WGo.KNode({
      move: move,
      _edited: true
    }));
    this.kifuReader.next(this.kifuReader.node.children.length-1);
    this.update();

    // remove edit listeners
    if (this._ev_click) this.board.removeEventListener("click", this._ev_click);
    if (this._ev_move) this.board.removeEventListener("mousemove", this._ev_move);
    if (this._ev_out) this.board.removeEventListener("mouseout", this._ev_out);

    this.state.editMode = false;

    console.log("move", move);
    console.log("kifu",this.kifuReader.kifu.toSgf());

    this.props.moveAction({
      turn: this.state.turn === 0 ? 1:0,
      move: move,
      position: this.kifuReader.kifu.toSgf()
    }, this.props.game._id);

    this.playStoneSound();
  }




  render() {
    const {i18n, deviceLayout} = this.props;

    let styles ={
      board: {
        width: deviceLayout.boardWidth,
        float: "left",
      },
      info: {
        width: deviceLayout.layout == "portrait" ?
          deviceLayout.boardWidth : deviceLayout.infoWidth,
        float: "left",
      },
      playerIcon: {
        float:'left',
        margin:"3px 3px 0 3px",
        color:"black",
        fontSize:18,
      },
      name: {
        float:'left',
        fontWeight:'bold',
      },
      rank: {
        float:'left',
        fontSize:'small',
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
      alert: {
        color: "red",
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
                style={styles.controlButton}
                label={i18n.SendInvitation}
                primary={true}
                onTouchTap = {this.props.openDialogAction.bind(null, false, "invitation",
                    {gameUrl: this.props.gameUrl, gameType: "go"})}/>
              :null
            }
            {this.state.status === "request" && this.state.creatorId !== this.props.userId && this.props.userId?
              <FlatButton
                style={styles.controlButton}
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
          <div style={styles.rank}>
            {i18n.Caps}:{this.state.blackCaps}
          </div>
          {this.state.turn ===0? <FontIcon className="fa fa-hand-o-left" style={styles.playerIcon}/>:null}
          <div style={{clear:"both"}} />
          <div style={styles.name}>
            <FontIcon className="fa fa-circle-thin" style={styles.playerIcon}/>
            {this.state.whiteName}
          </div>
          <div style={styles.rank}>
            {i18n.Caps}:{this.state.whiteCaps}
          </div>
          {this.state.turn ===1? <FontIcon className="fa fa-hand-o-left" style={styles.playerIcon}/>:null}
        </div>
      );
    };

    let getControls = function() {

      return (
        <div style={{width:"100%"}}>
          <FlatButton
            style={styles.labelButton}
            disabled ={false }
            label = {i18n.Coordinate}
            labelStyle={styles.labelSpan}
            primary={true}
            onTouchTap = {this.switchCoordinate.bind(this)}/>
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
          {deviceLayout.layout == "portrait"? getPlayerInfo.bind(this)(): null}
        </div>
        <div style={styles.board} ref="board" />
        <div style={styles.info}>
          {deviceLayout.layout != "portrait"? getPlayerInfo.bind(this)(): null}
          <div style={{clear:"both"}} />
          { getControls.bind(this)() }
          <div style={{clear:"both"}} />
          { getComment.bind(this)() }
        </div>

        <div style={styles.info}>
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
              {
                Object.keys(this.state.gameInfo).map(key => (
                  <div key={key}>
                    <span>{key} </span>
                    {this.state.gameInfo[key]}
                  </div>
                ))
              }
            </CardText>
          </Card>
        </div>

      </div>
    );

  }

}




