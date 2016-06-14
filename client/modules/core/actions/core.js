export default {

  switchLocale({Store}, locale) {

    Store.dispatch({
      type: 'SWITCH_LOCALE',
      locale,
    });
  },

  openDialog({Store}, modal, dialogType) {

    Store.dispatch({
      type: 'OPEN_DIALOG',
      modal,
      dialogType,
    });
  },

  closeDialog({Store}) {
    Store.dispatch({
      type: 'CLOSE_DIALOG',
    });
  },

};
