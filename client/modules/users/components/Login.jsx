import React from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';

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
    const {i18n} = this.props;

    const styles ={
      row: {
        display: 'block',
        margin: 20
      },
    };

    return (
      <Tabs tabItemContainerStyle={{backgroundColor:'darkcyan'}}>

        <Tab label={i18n.AccountLogin} >

          <LoginForm {...this.props}
            handleLoginSubmit={this.handleLoginSubmit.bind(this)}
          />

          <div  style={styles.row}>
            <a href="/password">{i18n.ForgotPassword}</a>
          </div>
          <div  style={styles.row}>
            <a  href="/register">{i18n.RegisterNewAccount}</a>
          </div>
        </Tab>

        <Tab label={i18n.SocialLogin} >
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
