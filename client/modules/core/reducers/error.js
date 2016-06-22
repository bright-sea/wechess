const defaultState = {
  savingError: null,
  invitationError: null,
  loginError: null,
  loginSocialError: null,
  registerError: null,
  passwordError: null,
  resetPasswordError: null,
  usersSavingError: null,
  usersDeleteError: null,
};

export default function(state = defaultState, action) {
  switch (action.type) {

    case 'SET_SAVING_ERROR':
      return Object.assign({}, state, { savingError: action.message });

    case 'SET_INVITATION_ERROR':
      return Object.assign({}, state, { invitationError: action.message });

    case 'SET_LOGIN_ERROR':
      return Object.assign({}, state, { loginError: action.message });

    case 'SET_LOGIN_SOCIAL_ERROR':
      return Object.assign({}, state, { loginSocialError: action.message });

    case 'SET_REGISTER_ERROR':
      return Object.assign({}, state, { registerError: action.message });

    case 'SET_PASSWORD_ERROR':
      return Object.assign({}, state, { passwordError: action.message });

    case 'SET_RESET_PASSWORD_ERROR':
      return Object.assign({}, state, { resetPasswordError: action.message });

    case 'SET_USERS_SAVING_ERROR':
      return Object.assign({}, state, { usersSavingError: action.message });

    case 'SET_USERS_DELETE_ERROR':
      return Object.assign({}, state, { usersDeleteError: action.message });

    default:
      return state;
  }
}

