export default function(state = true, action) {
  switch (action.type) {

    case 'SWITCH_STONE_SOUND':
      return action.stoneSound;
    default:
      return state;
  }
}

