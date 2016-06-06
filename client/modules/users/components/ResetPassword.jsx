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
    // console.log('resetForm');
    this.refs.form.reset();
  }

  validSubmit(data) {
    // console.log('validSubmit', data);
    this.props.submitResetPasswordAction(this.props.token, data.password1, data.password2);
  }
  // invalidSubmit() {
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
      page:{
        padding:20,
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
        margin: 20
      },
    };

    const {resetPasswordError} = this.props;

    return (
      <div style={styles.page}>

        <h3>重设密码</h3>

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
            name='password1'
            validations="minLength:8"
            validationError="密码有点短,请再试(最少八位)."
            required
            hintText="选择一个密码"
            type="password"
            value=""
            floatingLabelText="密码"
          />

          <FormsyText
            {...sharedProps}
            style={styles.row}
            name='password2'
            validations="equalsField:password1"
            validationErrors={{
                  equalsField: '密码必须匹配'
                }}
            required
            hintText="再次输入密码"
            type="password"
            value=""
            floatingLabelText="确定密码"
          />

          {resetPasswordError ?
          <div style={styles.errMessage}>
            {resetPasswordError}
          </div> : null }


          <div style={styles.row}>
            <RaisedButton
              style={styles.submitButton}
              type="submit"
              secondary={true}
              label="重设"
              icon={<FontIcon className="fa fa-user"/>}
              disabled={!this.state.canSubmit}
            />
          </div>
        </Formsy.Form>
      </div>
    );
  }
}
