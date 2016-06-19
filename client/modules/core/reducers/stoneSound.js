export default function(state = true, action) {
  switch (action.type) {

    case 'SWITCH_STONESOUND':
      return action.stoneSound;
    default:
      return state;
  }
}

