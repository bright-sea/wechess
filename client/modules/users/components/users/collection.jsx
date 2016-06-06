import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';


class UserList extends React.Component {


  render() {

    const {collection} = this.props;

    const {FlowRouter} = this.props.context();

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
            onTouchTap={() => {FlowRouter.go(`/users/${user._id}`);}}
          />
            ))}
        </List>
      </div>
    );
  }
}



export default UserList;
