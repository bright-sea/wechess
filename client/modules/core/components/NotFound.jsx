import React from 'react';

import styles from '../../../libs/styles.js';
import {List, ListItem} from 'material-ui/List';

import {
  FlatButton,
  RaisedButton,
  FontIcon,
  Divider,
} from 'material-ui';


export default class extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  render() {
    const {i18n} = this.props;
    const {router} = this.context;

    return (
      <div style={styles.header}>
        <div>{i18n.PageNotFound}</div>
        <div>
          <FlatButton
            primary={true}
            label={i18n.BackToHome}
            onTouchTap={() => {router.push(`/`); }}
          />
        </div>
      </div>
    );
  }

}

