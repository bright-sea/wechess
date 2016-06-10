export default {

  switchLocale({Meteor, FlowRouter, Store}, locale, callback) {

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
