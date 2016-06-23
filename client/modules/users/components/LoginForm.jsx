import React from 'react';

import styles from '../../../libs/styles.js';
import Formsy from 'formsy-react';

import { FormsyText } from 'formsy-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

export default class extends React.Component{

  constructor(props){
    super(props);
    this.state= {
      validatePristine: true,
      //disabled: false,
      canSubmit: false
    }
  }

  resetForm() {
    this.refs.form.reset();
  }

  validSubmit(data) {
    // console.log('validSubmit', data);
    this.props.handleLoginSubmit(data.email, data.password);
  }

  // invalidSubmit(data) {
  invalidSubmit() {
    // console.log('invalidSubmit', data);
  }

  enableButton() {
    // console.log('enable button');
    this.setState({ canSubmit: true });
  }

  disableButton() {
    // console.log('disable button');
    this.setState({ canSubmit: false });
  }

  render() {

    const sharedProps = {
      validatePristine: this.state.validatePristine,
      disabled: this.state.disabled,
    };

    const {loginError, i18n} = this.props;

    return (

      <div>

        <div>
          <FlatButton
            style={styles.socialButton}
            primary={true}
            icon={<FontIcon className="fa fa-facebook"/>}
            onTouchTap = {this.props.handleLoginFacebook}
          />
          <FlatButton
            style={styles.socialButton}
            primary={true}
            icon={<FontIcon className="fa fa-twitter"/>}
            onTouchTap = {this.props.handleLoginTwitter}
          />
          <FlatButton
            style={styles.socialButton}
            primary={true}
            icon={<FontIcon className="fa fa-google"/>}
            onTouchTap = {this.props.handleLoginGoogle}
          />
          <FlatButton
            style={styles.socialButton}
            primary={true}
            icon={<FontIcon className="fa fa-github"/>}
            onTouchTap = {this.props.handleLoginGithub}
          />
          <FlatButton
            style={styles.socialButton}
            primary={true}
            icon={<FontIcon className="fa fa-wechat"/>}
            disabled = {true}
          />
          <FlatButton
            style={styles.socialButton}
            primary={true}
            icon={<FontIcon className="fa fa-weibo"/>}
            disabled = {true}
          />
        </div>

        {loginError ?
          <div style={styles.errMessage}>
            {loginError}
          </div> : null }

        <Formsy.Form
          onValidSubmit={this.validSubmit.bind(this)}
          onInvalidSubmit={this.invalidSubmit.bind(this)}
          onValid={this.enableButton.bind(this)}
          onInvalid={this.disableButton.bind(this)}
          onChange={this.onChange}
          ref="form">

          <FormsyText
            {...sharedProps}
            style={styles.row}
            name="email"
            validations="isEmail"
            validationError={i18n.MessageInvalidEmail}
            required
            hintText={i18n.PromptEmail}
            value=""
            //floatingLabelText={i18n.EmailAddress}
          />

          <FormsyText
            {...sharedProps}
            style={styles.row}
            name='password'
            validations="minLength:8"
            validationError={i18n.MessageInvalidPassword}
            required
            hintText={i18n.PromptPassword}
            type="password"
            value=""
            //floatingLabelText={i18n.Password}
          />

          <div style={styles.row}>
            <RaisedButton
              type="submit"
              primary={true}
              label={i18n.Login}
              icon={<FontIcon className="fa fa-sign-in"/>}
              disabled={!this.state.canSubmit}
            />
          </div>
        </Formsy.Form>
      </div>
    );
  }
}
