import { push } from 'react-router-redux';


export default {

  add({Meteor, Store}, data) {
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
        return Store.dispatch({
          type: 'SET_USERS_SAVING_ERROR',
          message: err.message,
        });
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

  update({Meteor, Store}, data, _id) {
    // console.log ('actions.users.update _id', _id);
    // console.log ('actions.users.update data', data);

    Meteor.call('users.update', data, _id, (err) => {
      if (err) {
        return Store.dispatch({
          type: 'SET_USERS_SAVING_ERROR',
          message: err.message,
        });
      }
    });
  },

  delete({Meteor, Store}, _id) {
     console.log('actions.users.delete _id', _id);
     console.log('actions.users.delete Meteor.userId()', Meteor.userId());

    Meteor.call('users.delete', _id, (err) => {
      if (_id === Meteor.userId()) {
         console.log('cant delete self');
        return Store.dispatch({
          type: 'SET_USERS_DELETE_ERROR',
          message: 'Seppuku :-) ',
        });
      }
      if (err) {
        return Store.dispatch({
          type: 'SET_USERS_DELETE_ERROR',
          message: err.message,
        });
      }
      Store.dispatch(push(`/users/`));

    });
  },

  clearErrors({Store}) {
    Store.dispatch({
      type: 'SET_USERS_SAVING_ERROR',
      message: null,
    });
    return Store.dispatch({
      type: 'SET_USERS_DELETE_ERROR',
      message: null,
    });
  },

};
