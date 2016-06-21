import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';


export default class extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };


  render() {

    const {pgns, i18n} = this.props;

    return (
      <div>

        <List>
          <Subheader>{i18n.ChessManuals}</Subheader>

          {pgns.map(pgn => (
            <ListItem
              key={pgn._id}
              onTouchTap={() => {this.context.router.push(`/chess/pgn/${pgn._id}`);}}
              leftAvatar={<Avatar src="/images/chessgame.png" />}
              primaryText={pgn.title}
            />
          ))}
        </List>

      </div>
    );
  }
}

