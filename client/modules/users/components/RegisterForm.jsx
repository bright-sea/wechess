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
    this.props.handleRegisterSubmit(data.email, data.password1, data.password2);
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

    const {registerError} = this.props;

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

          {registerError ?
          <div style={styles.errMessage}>
            {registerError}
          </div> : null }


          <div style={styles.row}>
            <RaisedButton
              style={styles.submitButton}
              type="submit"
              secondary={true}
              label="注册"
              icon={<FontIcon className="fa fa-user"/>}
              disabled={!this.state.canSubmit}
            />
          </div>
        </Formsy.Form>
      </div>
    );
  }
}
