import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';


export default class extends React.Component {

  constructor(props){
    super(props);
    this.state={
      order: 1,
    }
  }

  createGame() {
    this.props.create(this.state.order, this.props.user);
  }

  handleChange(event, index, value){
    this.setState({order:value});
  }


  render() {
    const {i18n, loggedIn} = this.props;

    const styles ={
      row: {
        display: 'block',
        margin: 20
      },
    };

    return (
      <div>
        <h3>{i18n.InviteFriendToGame}</h3>
        {loggedIn?
          <div>
            <div style={styles.row}>
              <SelectField value={this.state.order}
                           onChange={this.handleChange.bind(this)}
                           floatingLabelText={i18n.SelectWhoPlayFirst}
                           floatingLabelStyle={{top:"20px"}}>
                <MenuItem value={1} primaryText={i18n.MePlayFirstAsWhite}/>
                <MenuItem value={0} primaryText={i18n.FriendPlayFirstAsWhite}/>
              </SelectField>
            </div>
            <div style={styles.row}>
              <RaisedButton
                primary={true}
                label={i18n.GenerateGame}
                onTouchTap={this.createGame.bind(this)}/>
            </div>
          </div>:
          <div>
            {i18n.LoginFirst}
          </div>
        }
      </div>
    );
  }

}

