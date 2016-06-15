import React from 'react';
import {List, ListItem} from 'material-ui/List';

import Divider from 'material-ui/Divider';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

import {getGameStatusText} from '../../core/libs/CommonHelper.js';

export default class extends React.Component{


  render() {

    const {i18n, loggedIn, user, chessgames} = this.props;

    const {FlowRouter} = this.props.context();

    const styles ={
      player:{
        float:"left",
        marginRight:20,
      }
    };

    return (
      <div>
        <FlatButton
          primary={true}
          label={i18n.CreateNewGame}
          onTouchTap={() => {FlowRouter.go(`/chess/game/create`); }}
        />

        <List>
          <Subheader>{i18n.MyPlayingGame}</Subheader>

          {chessgames.map( (game) => {
            return (
              <ListItem
                key={game._id}
                onTouchTap={() => {FlowRouter.go(`/chess/game/${game._id}`);}}
                leftAvatar={<Avatar src="/images/chessgame.png" />}
                primaryText={getGameStatusText("chess", user._id, game, i18n)}
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
            )

          })}
        </List>
      </div>
    );
  }
}


