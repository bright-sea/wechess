import React from 'react';

import PasswordForm from './PasswordForm.jsx';

export default class extends React.Component{

  handlePasswordSubmit(email) {
    this.props.submitPasswordAction(email);
  }

  render() {
    const {i18n} = this.props;

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

        <div  style={styles.row}>
          <a href="/login">{i18n.LoginExistingAccount}</a>
        </div>
      </div>
    );
  }
}
