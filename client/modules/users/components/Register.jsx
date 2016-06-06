import React from 'react';

import RegisterForm from './RegisterForm.jsx';

export default class extends React.Component{

  handleRegisterSubmit(email, password1, password2) {
    this.props.submitRegisterAction(email, password1, password2);
  }

  render() {

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

        <h3>注册新的帐号</h3>

        <RegisterForm {...this.props}
          handleRegisterSubmit={this.handleRegisterSubmit.bind(this)}
        />

        <div  style={styles.row}>
          <a href="/login">登录现有帐号</a>
        </div>
      </div>
    );
  }
}
