import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';


export default class extends React.Component{

  render() {
    const {sgfs} = this.props;

    const {FlowRouter} = this.props.context();

    return (
      <div>

        <List>
          <Subheader>职业围棋棋谱</Subheader>
          {sgfs.map( (sgf) => (
            <div>
              <Divider />
              <ListItem
                key={sgf._id}
                onTouchTap={() => {FlowRouter.go(`/go/sgf/${sgf._id}`);}}
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

