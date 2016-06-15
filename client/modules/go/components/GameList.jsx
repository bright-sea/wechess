import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';

import {getGameStatusText} from '../../core/libs/CommonHelper.js';

export default class extends React.Component{

  render() {
    const {i18n, loggedIn, user, gogames} = this.props;

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
          onTouchTap={() => {FlowRouter.go(`/go/game/create`); }}
        />

        <List>
          <Subheader>{i18n.YourPlayingGames}</Subheader>
          {gogames.map( (game) => {

            console.log("game", game);

            return (
                <ListItem
                  key={game._id}
                  onTouchTap={() => {FlowRouter.go(`/go/game/${game._id}`);}}
                  leftAvatar={<Avatar src="/images/gogame.png" />}
                  secondaryText={getGameStatusText("go", user._id, game, i18n)}
                  secondaryTextLines={2}
                  primaryText={<div key={game._id}>
                        {game.blackId == user._id?
                          <div>
                            <span>{i18n.YouAre}</span>
                            <FontIcon className="fa fa-circle"/>
                            {game.whiteId?
                              <span>{" "+i18n.OpponentIs+game.whiteName}</span>:null
                            }
                          </div>:
                          <div>
                            <span>{i18n.YouAre}</span>
                            <FontIcon className="fa fa-circle-thin"/>
                            {game.blackId?
                              <span>{" "+i18n.OpponentIs+game.blackName}</span>:null
                            }
                          </div>
                        }
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

