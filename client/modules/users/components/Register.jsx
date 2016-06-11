import React from 'react';

import RegisterForm from './RegisterForm.jsx';

export default class extends React.Component{

  handleRegisterSubmit(email, password1, password2) {
    this.props.submitRegisterAction(email, password1, password2);
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

        <h3>{i18n.RegisterNewAccount}</h3>

        <RegisterForm {...this.props}
          handleRegisterSubmit={this.handleRegisterSubmit.bind(this)}
        />

        <div  style={styles.row}>
          <a href="/login">{i18n.LoginExistingAccount}</a>
        </div>
      </div>
    );
  }
}
