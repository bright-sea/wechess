export default {

  switchLocale({Meteor, LocalState, FlowRouter, Store}, locale, callback) {
    LocalState.set('LOGIN_ERROR', null);

    Store.dispatch({
      type: 'SWITCH_LOCALE',
      locale,
    });

    if (callback){
      callback.apply();
    }else{
      FlowRouter.go('/');
    }
  },

};
