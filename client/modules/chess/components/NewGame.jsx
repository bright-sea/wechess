import React from 'react';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';


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
    const {loggedIn} = this.props;

    const styles ={
      page:{
        padding:20,
      },
      row: {
        display: 'block',
        margin: 20
      },
    };

    return (
      <div style={styles.page}>
        <h3>邀请友人对弈</h3>
        {loggedIn?
          <div>
            <div style={styles.row}>
              <SelectField value={this.state.order}
                           onChange={this.handleChange.bind(this)}
                           floatingLabelText="选择对弈先手："
                           floatingLabelStyle={{top:"20px"}}>
                <MenuItem value={1} primaryText="我执白先行"/>
                <MenuItem value={0} primaryText="友人执白先行"/>
              </SelectField>
            </div>
            <div style={styles.row}>
              <RaisedButton
                secondary={true}
                label="生成棋局"
                onTouchTap={this.createGame.bind(this)}/>
            </div>
          </div>:
          <div>
             请先登录!
          </div>
        }
      </div>
    );
  }

}

