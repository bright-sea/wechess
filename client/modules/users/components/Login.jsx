import React from 'react';

import styles from '../../../libs/styles.js';
import FlatButton from 'material-ui/FlatButton';

import LoginForm from './LoginForm.jsx';

export default class extends React.Component{

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

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
    const {router} = this.context;

    return (
      <div style={styles.page}>
        <LoginForm {...this.props}
          handleLoginSubmit={this.handleLoginSubmit.bind(this)}
          handleLoginFacebook={this.handleLoginFacebook.bind(this)}
          handleLoginTwitter={this.handleLoginTwitter.bind(this)}
          handleLoginGoogle={this.handleLoginGoogle.bind(this)}
          handleLoginGithub={this.handleLoginGithub.bind(this)}
        />

        <div>
          <FlatButton
            primary={true}
            label={i18n.ForgotPassword}
            onTouchTap={() => {router.push('/password');}}
          />
        </div>
        <div>
          <FlatButton
            primary={true}
            label={i18n.RegisterNewAccount}
            onTouchTap={() => {router.push('/register');}}
          />
        </div>
      </div>
    );
  }
}
