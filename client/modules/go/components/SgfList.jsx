import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';


export default class extends React.Component{

  render() {
    const {sgfs, i18n} = this.props;

    const {FlowRouter} = this.props.context();

    return (
      <div>

        <List>
          <Subheader>{i18n.ProGoManuals}</Subheader>
          {sgfs.map( (sgf) => (
            <div>
              <Divider />
              <ListItem
                key={sgf._id}
                onTouchTap={() => {FlowRouter.go(`/go/sgf/${sgf._id}`);}}
                leftAvatar={<Avatar src="/images/gogame.png" />}
                rightIcon={<FontIcon className="fa fa-chevron-right"
                    style={{paddingTop:5}}/>}
                primaryText={sgf.title}
              />
            </div>
          ))}
        </List>
        <Divider />
      </div>
    );
  }
}

