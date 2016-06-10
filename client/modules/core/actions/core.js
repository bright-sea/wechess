export default {

  switchLocale({Store}, locale) {

    Store.dispatch({
      type: 'SWITCH_LOCALE',
      locale,
    });
  },

};
