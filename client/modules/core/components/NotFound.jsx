import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';


export default class extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };


  render() {
    const {i18n} = this.props;

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
        <h2>{i18n.PageNotFound}</h2>
        <div>
          <FlatButton
            primary={true}
            label={i18n.BackToHome}
            onTouchTap={() => {this.context.router.push(`/`); }} />
        </div>

      </div>
    );
  }

}

