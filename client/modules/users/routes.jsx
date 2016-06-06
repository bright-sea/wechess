import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/MainLayout.jsx';

import Login from './containers/Login.js';
import Register from './containers/Register.js';
import Password from './containers/Password.js';
import ResetPassword from './containers/ResetPassword.js';

import Account from './components/Account.jsx';
import Profile from './components/Profile.jsx';

import UsersCollection from './containers/users/collection.js';
import UsersAdd from './containers/users/add.js';
import UsersSingle from './containers/users/single.js';
import UsersEdit from './containers/users/edit.js';



export default function (injectDeps, {Meteor, FlowRouter}) {

  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/register', {
    name: 'register',
    action() {

      if (Meteor.userId()) {
        FlowRouter.go('/profile');
      }

      mount(MainLayoutCtx, {
        content: () => (<Register />)
      });

    }
  });

  FlowRouter.route( '/verify-email/:token', {
    name: 'verify-email',
    action( params ) {
      Accounts.verifyEmail( params.token, ( error ) =>{
        if ( error ) {
          Bert.alert( error.reason, 'danger' );
        } else {
          FlowRouter.go( '/' );
          Bert.alert( 'Email verified! Thanks!', 'success' );
        }
      });
    }
  });

  FlowRouter.route( '/reset-password/:token', {
    name: 'reset-password',
    action( {token} ) {
      mount(MainLayoutCtx, {
        content: () => (<ResetPassword token={token}/>)
      });
    }
  });


  FlowRouter.route('/password', {
    name: 'password',
    action() {

      if (Meteor.userId()) {
        FlowRouter.go('/');
      }

      mount(MainLayoutCtx, {
        content: () => (<Password />)
      });
    }
  });

  FlowRouter.route('/login', {
    name: 'login',
    action() {

      if (Meteor.userId()) {
        FlowRouter.go('/');
      }

      mount(MainLayoutCtx, {
        content: () => (<Login />)
      });
    }
  });

  FlowRouter.route('/logout', {
    name: 'logout',
    action() {
      // Accounts.logout();
      Meteor.logout(() => {
        FlowRouter.go('/login');
      });
    }
  });

  FlowRouter.route('/account', {
    name: 'account',
    action() {

      if (!Meteor.userId()) {
        FlowRouter.go('/login');
      }

      mount(MainLayoutCtx, {
        content: () => (<Account />)
      });
    }
  });

  FlowRouter.route('/profile', {
    name: 'profile',
    action() {

      if (!Meteor.userId()) {
        FlowRouter.go('/login');
      }

      mount(MainLayoutCtx, {
        content: () => (<Profile name='users.profile'/>)
      });
    }
  });

  FlowRouter.route('/users', {
    name: 'users.collection',
    action() {

      if (!Meteor.userId()) {
        FlowRouter.go('/login');
      }

      mount(MainLayoutCtx, {
        content: () => (<UsersCollection />)
      });
    }
  });

  FlowRouter.route('/users/add', {
    name: 'users.add',
    action() {

      if (!Meteor.userId()) {
        FlowRouter.go('/login');
      }

      mount(MainLayoutCtx, {
        content: () => (<UsersAdd />)
      });
    }
  });

  FlowRouter.route('/users/:_id', {
    name: 'users.single',
    action({_id}) {

      if (!Meteor.userId()) {
        FlowRouter.go('/login');
      }

      mount(MainLayoutCtx, {
        content: () => (<UsersSingle _id={_id}/>)
      });
    }
  });

  FlowRouter.route('/users/:_id/edit', {
    name: 'users.edit',
    action({_id}) {

      if (!Meteor.userId()) {
        FlowRouter.go('/login');
      }

      mount(MainLayoutCtx, {
        content: () => (<UsersEdit _id={_id}/>)
      });
    }
  });
}
