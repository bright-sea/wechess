import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

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
      canSubmit: false,
      copied: false,
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
      page:{
        padding: 10,
      },
      errMessage: {
        color: "red",
      },
      row: {
        display: 'block',
        paddingTop:20,
      },
      prompt: {
        fontSize:"small",
      },
      title: {
        fontWeight:"bold",
        textAlign: "center",
      }
    };

    const {invitationError, gameUrl } = this.props;

    return (

      <div style={styles.page}>
        <div style={styles.title}>{i18n.SendInvitationTitle}</div>

        <div style={styles.prompt}>{i18n.PromptInvitationAction} </div>

        <br/>

        <CopyToClipboard text={this.props.gameUrl}
                         onCopy={() => this.setState({copied: true})}>
          <RaisedButton
            primary={true}
            label={i18n.CopyToClipboard}
          />
        </CopyToClipboard>

        {this.state.copied ? <span style={{color: 'red'}}>{i18n.Copied}</span> : null}

        <Formsy.Form
          onValidSubmit={this.validSubmit.bind(this)}
          onInvalidSubmit={this.invalidSubmit.bind(this)}
          onValid={this.enableButton.bind(this)}
          onInvalid={this.disableButton.bind(this)}
          onChange={this.onChange}
          ref="form">

          <FormsyText
            {...sharedProps}
            name="email"
            validations="isEmail"
            validationError={i18n.MessageInvalidEmail}
            required
            value=""
            floatingLabelText={i18n.PromptInputFriendEmail}
            //floatingLabelFixed={true}
            fullWidth={true}
          />

          {invitationError ?
            <div style={styles.errMessage}>
              {invitationError}
            </div> : null }

          <div style={styles.row}>
            <RaisedButton
              primary={true}
              type="submit"
              label={i18n.SendEmail}
              disabled={!this.state.canSubmit}
            />
          </div>

        </Formsy.Form>



      </div>
    );
  }
}
