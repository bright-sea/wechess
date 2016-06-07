import {Accounts} from 'meteor/accounts-base';

export default {

  login({Meteor, LocalState, FlowRouter}, email, password, callback) {
    if (!email || !password) {
      return LocalState.set('LOGIN_ERROR', '邮箱地址和密码都不能为空!');
    }

    LocalState.set('LOGIN_ERROR', null);

    Meteor.loginWithPassword(email, password, (err) => {
      if (err && err.reason) {
        return LocalState.set('LOGIN_ERROR', err.reason);
      }

      if (callback){
        callback.apply();
      }else{
        FlowRouter.go('/');
      }
    });
  },

  loginErrorClear({LocalState}) {
    return LocalState.set('LOGIN_ERROR', null);
  },

  register({Meteor, LocalState, FlowRouter}, email, password1, password2, callback) {
    if (!email || !password1 || !password2) {
      return LocalState.set('REGISTER_ERROR', '请填好所有必填字段!');
    }

    if (password1 !== password2 ) {
      return LocalState.set('REGISTER_ERROR', '密码不匹配!');
    }

    Accounts.createUser({email, password: password1}, (err) => {
      if (err && err.reason) {
        return LocalState.set('REGISTER_ERROR', err.reason);
      }

      Meteor.call( 'sendVerificationLink', ( error, response ) => {
        if ( error ) {
          return LocalState.set('REGISTER_ERROR', err.reason);
        } else {
          if (callback){
            callback.apply();
          }else{
            FlowRouter.go('/');
          }
        }
      });
    });
  },

  registerErrorClear({LocalState}) {
    return LocalState.set('REGISTER_ERROR', null);
  },


  loginWithFacebook({Meteor, LocalState, FlowRouter}, callback){
    Meteor.loginWithFacebook( {
      requestPermissions: [ 'email' ]
    }, ( error ) => {
      if ( error ) {
        return LocalState.set('LOGIN_ERROR', error.message);
      }
      if (callback){
        callback.apply();
      }else{
        FlowRouter.go('/');
      }
    });
  },

  loginWithTwitter({Meteor, LocalState, FlowRouter}, callback){
    Meteor.loginWithTwitter( {}, ( error ) => {
      if ( error ) {
        return LocalState.set('LOGIN_ERROR', error.message);
      }
      if (callback){
        callback.apply();
      }else{
        FlowRouter.go('/');
      }
    });
  },

  loginWithGoogle({Meteor, LocalState, FlowRouter}, callback){
    Meteor.loginWithGoogle( {
      requestPermissions: [ 'email' ]
    }, ( error ) => {
      if ( error ) {
        return LocalState.set('LOGIN_ERROR', error.message);
      }
      if (callback){
        callback.apply();
      }else{
        FlowRouter.go('/');
      }
    });
  },

  loginWithGithub({Meteor, LocalState, FlowRouter}, callback){
    Meteor.loginWithGithub( {
      requestPermissions: [ 'email' ]
    }, ( error ) => {
      if ( error ) {
        return LocalState.set('LOGIN_ERROR', error.message);
      }
      if (callback){
        callback.apply();
      }else{
        FlowRouter.go('/');
      }
    });
  },

  password({Meteor, LocalState, FlowRouter}, email, callback) {
    if (!email) {
      return LocalState.set('PASSWORD_ERROR', '邮箱地址不能为空!');
    }

    LocalState.set('PASSWORD_ERROR', null);

    Meteor.call( 'sendResetPasswordLink', email, ( error, response ) => {

      if ( error ) {
        return LocalState.set('PASSWORD_ERROR', error.reason);
      } else {
        Bert.alert( 'Email Sent. Check your mailbox.', 'success' );
      }
    });
  },

  passwordErrorClear({LocalState}) {
    return LocalState.set('PASSWORD_ERROR', null);
  },

  resetPassword({Meteor, LocalState, FlowRouter}, token, password, confirmPassword, callback) {
    if (!token){
      return LocalState.set('RESET_PASSWORD_ERROR', '重设密码Token不能为空!');
    }

    if (!password || !confirmPassword ) {
      return LocalState.set('RESET_PASSWORD_ERROR', '密码或确定密码不能为空!');
    }

    if ( password != confirmPassword ) {
      return LocalState.set('RESET_PASSWORD_ERROR', '密码和确定密码不一致!');
    }

    LocalState.set('RESET_PASSWORD_ERROR', null);

    Accounts.resetPassword(token, password, function(error) {
      if (error) {
        console.log("error", error, error.reason);
        return LocalState.set('RESET_PASSWORD_ERROR', 'We are sorry but something went wrong.');
      } else {
        Bert.alert( 'Password reset successfully.', 'success' );
      }
    });

    //Meteor.call( 'resetPassword', token, password, ( error, response ) => {
    //
    //  if ( error ) {
    //    return LocalState.set('RESET_PASSWORD_ERROR', error.reason);
    //  } else {
    //    Bert.alert( 'Password reset successfully.', 'success' );
    //  }
    //});
  },

  resetPasswordErrorClear({LocalState}) {
    return LocalState.set('RESET_PASSWORD_ERROR', null);
  },

};
