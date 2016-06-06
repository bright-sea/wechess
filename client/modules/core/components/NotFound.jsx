import React from 'react';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';


export default class extends React.Component {

  render() {
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
        <h2>您访问的页面不存在</h2>
        <div>
          <FlatButton
            secondary={true}
            label="回到主页"
            onTouchTap={() => {FlowRouter.go(`/`); }} />
        </div>

      </div>
    );
  }

}

