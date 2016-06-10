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

    const {loginError} = this.props;

    return (

      <div>
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
            validationError="请提供一个有效的邮箱地址"
            required
            hintText="输入一个邮箱地址"
            value=""
            floatingLabelText="邮箱地址"
          />

          <FormsyText
            {...sharedProps}
            style={styles.row}
            name='password'
            validations="minLength:8"
            validationError="密码有点短,请再试(最少八位)"
            required
            hintText="输入您的密码"
            type="password"
            value=""
            floatingLabelText="密码"
          />

          {loginError ?
            <div style={styles.errMessage}>
              {loginError}
            </div> : null }

          <div style={styles.row}>
            <RaisedButton
              style={styles.submitButton}
              type="submit"
              secondary={true}
              label="登录"
              icon={<FontIcon className="fa fa-sign-in"/>}
              disabled={!this.state.canSubmit}
            />

          </div>


        </Formsy.Form>
      </div>
    );
  }
}
