import React from 'react';

import FlatButton from 'material-ui/FlatButton';

import RegisterForm from './RegisterForm.jsx';

export default class extends React.Component{

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };


  handleRegisterSubmit(email, password1, password2) {
    this.props.submitRegisterAction(email, password1, password2);
  }

  render() {
    const {i18n} = this.props;
    const {router} = this.context;

    return (
      <div>


        <RegisterForm {...this.props}
          handleRegisterSubmit={this.handleRegisterSubmit.bind(this)}
        />

        <div>
          <FlatButton
            primary={true}
            label={i18n.LoginExistingAccount}
            onTouchTap={() => {router.push('/login');}}
          />
        </div>
      </div>
    );
  }
}
