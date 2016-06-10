import {Accounts} from 'meteor/accounts-base';

export default {

  login({Meteor, Store, FlowRouter}, email, password, callback) {
    if (!email || !password) {
      return Store.dispatch({
        type: 'SET_LOGIN_ERROR',
        message: '邮箱地址和密码都不能为空!',
      });
    }

    Store.dispatch({
      type: 'SET_LOGIN_ERROR',
      message: null,
    });

    Meteor.loginWithPassword(email, password, (err) => {
      if (err && err.reason) {
        return Store.dispatch({
          type: 'SET_LOGIN_ERROR',
          message: err.reason,
        });
      }

      if (callback){
        callback.apply();
      }else{
        FlowRouter.go('/');
      }
    });
  },

  loginErrorClear({Store}) {
    return Store.dispatch({
      type: 'SET_LOGIN_ERROR',
      message: null,
    });
  },

  register({Meteor, Store, FlowRouter}, email, password1, password2, callback) {
    if (!email || !password1 || !password2) {
      return Store.dispatch({
        type: 'SET_REGISTER_ERROR',
        message: '请填好所有必填字段!',
      });
    }

    if (password1 !== password2 ) {
      return Store.dispatch({
        type: 'SET_REGISTER_ERROR',
        message: '密码不匹配!',
      });
    }

    Accounts.createUser({email, password: password1}, (err) => {
      if (err && err.reason) {
        return Store.dispatch({
          type: 'SET_REGISTER_ERROR',
          message: err.reason,
        });
      }

      Meteor.call( 'sendVerificationLink', ( error, response ) => {
        if ( error ) {
          return Store.dispatch({
            type: 'SET_REGISTER_ERROR',
            message: err.reason,
          });
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

  registerErrorClear({Store}) {
    return Store.dispatch({
      type: 'SET_REGISTER_ERROR',
      message: null,
    });
  },


  loginWithFacebook({Meteor, Store, FlowRouter}, callback){
    Meteor.loginWithFacebook( {
      requestPermissions: [ 'email' ]
    }, ( error ) => {
      if ( error ) {
        return Store.dispatch({
          type: 'SET_LOGIN_ERROR',
          message: error.message,
        });
      }
      if (callback){
        callback.apply();
      }else{
        FlowRouter.go('/');
      }
    });
  },

  loginWithTwitter({Meteor, Store, FlowRouter}, callback){
    Meteor.loginWithTwitter( {}, ( error ) => {
      if ( error ) {
        return Store.dispatch({
          type: 'SET_LOGIN_ERROR',
          message: error.message,
        });
      }
      if (callback){
        callback.apply();
      }else{
        FlowRouter.go('/');
      }
    });
  },

  loginWithGoogle({Meteor, Store, FlowRouter}, callback){
    Meteor.loginWithGoogle( {
      requestPermissions: [ 'email' ]
    }, ( error ) => {
      if ( error ) {
        return Store.dispatch({
          type: 'SET_LOGIN_ERROR',
          message: error.message,
        });
      }
      if (callback){
        callback.apply();
      }else{
        FlowRouter.go('/');
      }
    });
  },

  loginWithGithub({Meteor, Store, FlowRouter}, callback){
    Meteor.loginWithGithub( {
      requestPermissions: [ 'email' ]
    }, ( error ) => {
      if ( error ) {
        return Store.dispatch({
          type: 'SET_LOGIN_ERROR',
          message: error.message,
        });
      }
      if (callback){
        callback.apply();
      }else{
        FlowRouter.go('/');
      }
    });
  },

  password({Meteor, Store, FlowRouter}, email, callback) {
    if (!email) {
      return Store.dispatch({
        type: 'SET_PASSWORD_ERROR',
        message: '邮箱地址不能为空!',
      });
    }

    Store.dispatch({
      type: 'SET_PASSWORD_ERROR',
      message: null,
    });

    Meteor.call( 'sendResetPasswordLink', email, ( error, response ) => {

      if ( error ) {
        return Store.dispatch({
          type: 'SET_PASSWORD_ERROR',
          message: error.reason,
        });
      } else {
        Bert.alert( 'Email Sent. Check your mailbox.', 'success' );
      }
    });
  },

  passwordErrorClear({Store}) {
    return Store.dispatch({
      type: 'SET_PASSWORD_ERROR',
      message: null,
    });
  },

  resetPassword({Meteor, Store, FlowRouter}, token, password, confirmPassword, callback) {
    if (!token){
      return Store.dispatch({
        type: 'SET_RESET_PASSWORD_ERROR',
        message: '重设密码Token不能为空!',
      });
    }

    if (!password || !confirmPassword ) {
      return Store.dispatch({
        type: 'SET_RESET_PASSWORD_ERROR',
        message: '密码或确定密码不能为空!',
      });
    }

    if ( password != confirmPassword ) {
      return Store.dispatch({
        type: 'SET_RESET_PASSWORD_ERROR',
        message: '密码和确定密码不一致!',
      });
    }

    Store.dispatch({
      type: 'SET_RESET_PASSWORD_ERROR',
      message: null,
    });

    Accounts.resetPassword(token, password, function(error) {
      if (error) {
        console.log("error", error, error.reason);
        return Store.dispatch({
          type: 'SET_RESET_PASSWORD_ERROR',
          message: 'We are sorry but something went wrong.',
        });
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

  resetPasswordErrorClear({Store}) {
    return Store.dispatch({
      type: 'SET_RESET_PASSWORD_ERROR',
      message: null,
    });
  },

};
