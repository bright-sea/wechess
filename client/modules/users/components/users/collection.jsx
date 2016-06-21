import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';


export default class extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };


  render() {
    const {collection} = this.props;

    const styles ={
      page:{
        padding:20,
      },
      list:{
        width: 300
      },
    };

    return (
      <div style={styles.page}>
        <h3>所有注册用户</h3>
        <List style={styles.list}>
          {collection.map(user => (
          <ListItem
            key={user._id}
            primaryText={user.emails?user.emails[0].address:user.profile.name}
            leftIcon={<FontIcon className="fa fa-user"/>}
            onTouchTap={() => {this.context.router.push(`/users/${user._id}`);}}
          />
            ))}
        </List>
      </div>
    );
  }
};
