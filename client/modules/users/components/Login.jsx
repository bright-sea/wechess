import React from 'react';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import LoginForm from './LoginForm.jsx';
import LoginSocial from './LoginSocial.jsx';



export default class extends React.Component{

  handleLoginSubmit(email, password) {
    this.props.submitLoginAction(email, password);
  }

  handleLoginFacebook() {
    this.props.loginWithFacebook();
  }

  handleLoginTwitter() {
    this.props.loginWithTwitter();
  }

  handleLoginGoogle() {
    this.props.loginWithGoogle();
  }

  handleLoginGithub() {
    this.props.loginWithGithub();
  }

  render() {
    const styles ={
      row: {
        display: 'block',
        margin: 20
      },
    };

    return (
      <Tabs tabItemContainerStyle={{backgroundColor:'darkcyan'}}>

        <Tab label="WeChess登录" >

          <LoginForm {...this.props}
            handleLoginSubmit={this.handleLoginSubmit.bind(this)}
          />

          <div  style={styles.row}>
            <a href="/password">忘记密码</a>
          </div>
          <div  style={styles.row}>
            <a  href="/register">注册一个账户</a>
          </div>
        </Tab>

        <Tab label="社交平台登录" >
          <LoginSocial {...this.props}
            handleLoginFacebook={this.handleLoginFacebook.bind(this)}
            handleLoginTwitter={this.handleLoginTwitter.bind(this)}
            handleLoginGoogle={this.handleLoginGoogle.bind(this)}
            handleLoginGithub={this.handleLoginGithub.bind(this)}
          />
        </Tab>
      </Tabs>
    );
  }
}
