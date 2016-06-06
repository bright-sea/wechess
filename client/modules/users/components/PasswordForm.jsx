import React from 'react';

import Formsy from 'formsy-react';

import { FormsyText } from 'formsy-material-ui';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';

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

    const {passwordError} = this.props;

    return (

      <div>
        <Formsy.Form
          onValidSubmit={this.validSubmit.bind(this)}
          onInvalidSubmit={this.invalidSubmit.bind(this)}
          onValid={this.enableButton.bind(this)}
          onInvalid={this.disableButton.bind(this)}
          onChange={this.onChange}
          ref="form">

          <div style={styles.row}>
            输入您的邮箱地址, 我们将会发送重设密码的链接给您.
          </div>

          <FormsyText
            {...sharedProps}
            style={styles.row}
            name="email"
            validations="isEmail"
            validationError="请提供一个有效的邮箱地址."
            required
            hintText="输入一个邮箱地址"
            value=""
            floatingLabelText="邮箱地址"
          />

          {passwordError ?
            <div style={styles.errMessage}>
              {passwordError}
            </div> : null }

          <div style={styles.row}>
            <RaisedButton
              style={styles.submitButton}
              type="submit"
              label="发送重设密码链接"
              disabled={!this.state.canSubmit}
            />
          </div>

        </Formsy.Form>
      </div>
    );
  }
}
