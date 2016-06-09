function localeReducer(state = 'en-US', action) {
  switch (action.type) {

    case 'SWITCH_LOCALE':
      return action.locale;
    default:
      return state;
  }
}

export default localeReducer;
