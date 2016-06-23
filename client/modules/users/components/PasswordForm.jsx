import React from 'react';

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
      disabled: false,
      canSubmit: false
    }
  }

  resetForm() {
    this.refs.form.reset();
  }

  validSubmit(data) {
    // console.log('validSubmit', data);
    this.props.handlePasswordSubmit(data.email);
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

    const styles ={
      header: {
        textAlign:"center",
        padding:20,
        fontWeight: "bold",
      },
      submitButton:{
        marginRight:20,
        marginTop: 20,
      },
      errMessage: {
        color: "red",
      },
      row: {
        display: 'block',
        margin: 10
      },
    };

    const {passwordError, i18n} = this.props;

    return (

      <div>
        <div style={styles.header}>
          {i18n.ForgotPassword}
        </div>

        <Formsy.Form
          onValidSubmit={this.validSubmit.bind(this)}
          onInvalidSubmit={this.invalidSubmit.bind(this)}
          onValid={this.enableButton.bind(this)}
          onInvalid={this.disableButton.bind(this)}
          onChange={this.onChange}
          ref="form">

          <div style={styles.row}>
            {i18n.PromptResetPassword}
          </div>

          <FormsyText
            {...sharedProps}
            style={styles.row}
            name="email"
            validations="isEmail"
            validationError={i18n.MessageInvalidEmail}
            required
            hintText={i18n.PromptEmail}
            value=""
            floatingLabelText={i18n.EmailAddress}
          />

          {passwordError ?
            <div style={styles.errMessage}>
              {passwordError}
            </div> : null }

          <div style={styles.row}>
            <RaisedButton
              style={styles.submitButton}
              type="submit"
              label={i18n.SendResetLink}
              disabled={!this.state.canSubmit}
            />
          </div>

        </Formsy.Form>
      </div>
    );
  }
}
