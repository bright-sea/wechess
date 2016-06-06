import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';

import {getGameStatusText} from '../../core/libs/CommonHelper.js';

export default class extends React.Component{


  render() {

    const {loggedIn, user, chessgames} = this.props;

    const {FlowRouter} = this.props.context();

    const styles ={
      row: {
        display: 'block',
        margin: 20
      },
      player:{
        float:"left",
        marginRight:20,
      }
    };

    return (
      <div>
        <div style={styles.row}>
          <RaisedButton
            secondary={true}
            label="邀请朋友对弈"
            onTouchTap={() => {FlowRouter.go(`/chess/game/create`); }}/>
        </div>

        <List subheader ="我正在进行的国际象棋对局">
          {chessgames.map( (game) => {
            return (
              <div key={game._id}>
                <Divider />
                <ListItem
                  onTouchTap={() => {FlowRouter.go(`/chess/game/${game._id}`);}}
                  rightIcon={<FontIcon className="fa fa-chevron-right"
                      style={{paddingTop:20}}/>}
                  primaryText={getGameStatusText("chess", user._id, game)}
                  secondaryText=""
                  children={<div key={game._id}>
                    <div style={styles.player}>
                      <FontIcon className="fa fa-circle-thin"/>
                      {game.whiteName}
                    </div>
                    <div style={styles.player}>
                      <FontIcon className="fa fa-circle"/>
                      {game.blackName}
                    </div>
                    <div style={{clear:"both"}} />
                  </div>}
                />
              </div>

            )

          })}
        </List>
      </div>
    );
  }
}


