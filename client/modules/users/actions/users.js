import { push } from 'react-router-redux';


export default {

  add({Meteor, LocalState, Store}, data) {
    // console.log('actions.users.add data', data);
    // const _id = Meteor.uuid();

    const userObject = {
      email: data.email,
      profile: {
        firstName: data.firstName,
        lastName: data.lastName
      }
    };

    Meteor.call('users.add', userObject, (err, response) => {
      if (err) {
        return LocalState.set('users.SAVE_ERROR', err.message);
      }
      if (response._idNew) {
        Store.dispatch(push('/users/' + response._idNew));
      }
    });

    // const user_id = Accounts.createUser(userObject, (err,res) => {
    //   if (err && err.reason) {
    //     return LocalState.set('_colors.SAVE_ERROR', err.reason);
    //   } else {
    //
    //   }
    // });

    // Store.dispatch(push('/users/'));
  },

  update({Meteor, LocalState}, data, _id) {
    // console.log ('actions.users.update _id', _id);
    // console.log ('actions.users.update data', data);

    Meteor.call('users.update', data, _id, (err) => {
      if (err) {
        return LocalState.set('users.SAVE_ERROR', err.message);
      }
    });
  },

  delete({Meteor, LocalState, Store}, _id) {
     console.log('actions.users.delete _id', _id);
     console.log('actions.users.delete Meteor.userId()', Meteor.userId());

    Meteor.call('users.delete', _id, (err) => {
      if (_id === Meteor.userId()) {
         console.log('cant delete self');
        return LocalState.set('users.DELETE_ERROR', 'Seppuku :-) ');
      }
      if (err) {
        return LocalState.set('users.DELETE_ERROR', err.message);
      }
      Store.dispatch(push(`/users/`));

    });
  },

  clearErrors({LocalState}) {
    LocalState.set('users.DELETE_ERROR', null);
    return LocalState.set('users.SAVE_ERROR', null);
  },

};
