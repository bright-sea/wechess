import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';


export default class extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };


  render() {
    const {i18n, loggedIn, collection} = this.props;
    const {router} = this.context;

    return (
      <div>
        {loggedIn ?
          <List>
            <Subheader>{i18n.AllRegisterUsers}</Subheader>
            {collection.map(user => (
              <ListItem
                key={user._id}
                primaryText={user.emails?user.emails[0].address:user.profile.name}
                leftIcon={<FontIcon className="fa fa-user"/>}
                onTouchTap={() => {router.push(`/users/${user._id}`);}}
              />
            ))}
          </List> : null
        }
      </div>
    );
  }
};
