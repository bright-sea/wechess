import React from 'react';

import Formsy from 'formsy-react';

import { FormsyText } from 'formsy-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import TextField from 'material-ui/TextField';


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
    this.props.handleInvitationSubmit(data.email, this.props.gameUrl, this.props.gameType);
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
    const {i18n} = this.props;

    const sharedProps = {
      validatePristine: this.state.validatePristine,
      disabled: this.state.disabled,
    };

    const styles ={
      submitButton:{
        marginRight:20,
        marginTop: 20,
      },
      errMessage: {
        color: "red",
      },
      row: {
        display: 'block',
        margin: 20
      },
    };

    const {invitationError, gameUrl } = this.props;

    return (

      <div>
        <Formsy.Form
          onValidSubmit={this.validSubmit.bind(this)}
          onInvalidSubmit={this.invalidSubmit.bind(this)}
          onValid={this.enableButton.bind(this)}
          onInvalid={this.disableButton.bind(this)}
          onChange={this.onChange}
          ref="form">

          <div style={styles.row}>{i18n.PromptInputFriendEmail}</div>

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

          {invitationError ?
            <div style={styles.errMessage}>
              {invitationError}
            </div> : null }

          <div style={styles.row}>
            <RaisedButton
              style={styles.submitButton}
              type="submit"
              label={i18n.SendGameInvitation}
              disabled={!this.state.canSubmit}
            />
          </div>

        </Formsy.Form>

        <div style={styles.row}>{i18n.PromptCopyGameLink}</div>

        <div style={styles.row}>
          <TextField
            id="gameUrl"
            defaultValue={gameUrl}
            multiLine={true}
            rows={2}
            rowsMax={4}
          />
        </div>

      </div>
    );
  }
}
