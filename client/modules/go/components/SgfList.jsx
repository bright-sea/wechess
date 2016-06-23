import React from 'react';

import styles from '../../../libs/styles.js';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';


export default class extends React.Component{
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  render() {
    const {sgfs, i18n} = this.props;

    return (
      <div>

        <List>
          <Subheader>{i18n.GoManuals}</Subheader>
          {sgfs.map( (sgf) => (
              <ListItem
                key={sgf._id}
                onTouchTap={() => {this.context.router.push(`/go/sgf/${sgf._id}`);}}
                leftAvatar={<Avatar src="/images/gogame.png" />}
                primaryText={sgf.title}
              />
          ))}
        </List>
        <Divider />
      </div>
    );
  }
}

