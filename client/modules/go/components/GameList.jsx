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
    const {loggedIn, user, gogames} = this.props;

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
            onTouchTap={() => {FlowRouter.go(`/go/game/create`); }}/>
        </div>

        <List subheader ="我正在进行的围棋对局">
          {gogames.map( (game) => {

            return (
              <div key={game._id}>
                <Divider />
                <ListItem
                  onTouchTap={() => {FlowRouter.go(`/go/game/${game._id}`);}}
                  rightIcon={<FontIcon className="fa fa-chevron-right"
                      style={{paddingTop:20}}/>}
                  primaryText={getGameStatusText("go", user._id, game)}
                  secondaryText=""
                  children={<div key={game._id}>
                        <div style={styles.player}>
                          <FontIcon className="fa fa-circle"/>
                          {game.blackName}
                        </div>
                        <div style={styles.player}>
                          <FontIcon className="fa fa-circle-thin"/>
                          {game.whiteName}
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

