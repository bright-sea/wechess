import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';


export default class extends React.Component {


  render() {

    const {pgns} = this.props;

    const {FlowRouter} = this.props.context();

    return (
      <div>

        <List>
          <Subheader>国际象棋棋谱</Subheader>

          {pgns.map(pgn => (
            <div>
            <ListItem
              key={pgn._id}
              onTouchTap={() => {FlowRouter.go(`/chess/pgn/${pgn._id}`);}}
              rightIcon={<FontIcon className="fa fa-chevron-right"
                    style={{paddingTop:5}}/>}
              primaryText={pgn.title}
            />
            <Divider />
              </div>
          ))}
        </List>

      </div>
    );
  }
}

