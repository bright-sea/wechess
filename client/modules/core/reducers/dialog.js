const defaultState = {
  open: false,
  modal: false,
  dialogType: null,
  payload: {}
};

export default function(state = defaultState, action) {
  switch (action.type) {

    case 'OPEN_DIALOG':
      return Object.assign({}, state, {
        open: true,
        modal: action.modal,
        dialogType: action.dialogType,
        payload: action.payload,
      });

    case 'CLOSE_DIALOG':
      return Object.assign({}, state, defaultState);

    default:
      return state;
  }
}

