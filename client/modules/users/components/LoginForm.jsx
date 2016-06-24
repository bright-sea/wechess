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
      canSubmit: false
    }
  }

  validSubmit(data) {
    // console.log('validSubmit', data);
    this.props.handleLoginSubmit(data.email, data.password);
  }

  // invalidSubmit(data) {
  invalidSubmit(data) {
     console.log('invalidSubmit', data);
  }

  enableButton() {
    // console.log('enable button');
    this.setState({ canSubmit: true });
  }

  disableButton() {
    // console.log('disable button');
    this.setState({ canSubmit: false });
  }

  onChange(){
    //console.log("changes", arguments);
  }

 // https://github.com/christianalfoni/formsy-react/issues/142
  lookForChanges() {
    if (this.refs.email.muiComponent.input.value && this.refs.password.muiComponent.input.value){
      console.log("clean by set autofill values");
      this.refs.email.setValue(this.refs.email.muiComponent.input.value);
      this.refs.password.setValue(this.refs.password.muiComponent.input.value);
      clearInterval(this.interval);
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.lookForChanges.bind(this), 500);
  }

  componentWillUnmount() {
    return clearInterval(this.interval);
  }

  render() {

    const {loginError, i18n} = this.props;

    const localStyles = {
      socialButton: {
        minWidth:36,
      },
    };

    return (

      <div>

        <div style={styles.header}>
          {i18n.Login}
        </div>
        <div>
          <FlatButton
            style={localStyles.socialButton}
            primary={true}
            icon={<FontIcon className="fa fa-facebook"/>}
            onTouchTap = {this.props.handleLoginFacebook}
          />
          <FlatButton
            style={localStyles.socialButton}
            primary={true}
            icon={<FontIcon className="fa fa-twitter"/>}
            onTouchTap = {this.props.handleLoginTwitter}
          />
          <FlatButton
            style={localStyles.socialButton}
            primary={true}
            icon={<FontIcon className="fa fa-google"/>}
            onTouchTap = {this.props.handleLoginGoogle}
          />
          <FlatButton
            style={localStyles.socialButton}
            primary={true}
            icon={<FontIcon className="fa fa-github"/>}
            onTouchTap = {this.props.handleLoginGithub}
          />
          <FlatButton
            style={localStyles.socialButton}
            primary={true}
            icon={<FontIcon className="fa fa-wechat"/>}
            disabled = {true}
          />
          <FlatButton
            style={localStyles.socialButton}
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
            ref="email"
            style={styles.row}
            name="email"
            validations="isEmail"
            validationError={i18n.MessageInvalidEmail}
            required
            hintText={i18n.EmailAddress}
            value=""
            //floatingLabelText={i18n.EmailAddress}
          />

          <FormsyText
            ref="password"
            style={styles.row}
            name='password'
            validations="minLength:8"
            validationError={i18n.MessageInvalidPassword}
            required
            hintText={i18n.Password}
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
