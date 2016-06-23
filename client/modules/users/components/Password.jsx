import React from 'react';

import styles from '../../../libs/styles.js';
import FlatButton from 'material-ui/FlatButton';

import PasswordForm from './PasswordForm.jsx';

export default class extends React.Component{

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  handlePasswordSubmit(email) {
    this.props.submitPasswordAction(email);
  }

  render() {
    const {i18n} = this.props;
    const {router} = this.context;

    return (
      <div style={styles.page}>

        <PasswordForm {...this.props}
          handlePasswordSubmit={this.handlePasswordSubmit.bind(this)}
        />

        <div>
          <FlatButton
            primary={true}
            label={i18n.LoginExistingAccount}
            onTouchTap={() => {router.push('/login');}}
          />
        </div>
      </div>
    );
  }
}
