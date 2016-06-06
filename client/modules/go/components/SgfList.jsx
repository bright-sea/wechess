import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';


export default class extends React.Component{


  render() {

    const {sgfs} = this.props;

    const {FlowRouter} = this.props.context();

    return (
      <div>

        <List subheader ="职业围棋棋谱" insetSubheader={true}>
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

