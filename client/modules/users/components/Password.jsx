import React from 'react';

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

        <h3>{i18n.ForgotPassword}</h3>

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
