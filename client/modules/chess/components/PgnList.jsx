import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';


export default class extends React.Component {


  render() {

    const {pgns} = this.props;

    const {FlowRouter} = this.props.context();

    return (
      <div>

        <List subheader ="国际象棋棋谱">
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

