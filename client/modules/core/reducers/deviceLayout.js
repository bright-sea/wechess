import Device from '../libs/Device.js';

export default function(state = Device.getDeviceLayout(), action) {
  switch (action.type) {

    case 'CHANGE_DEVICE_LAYOUT':
      return Device.getDeviceLayout();
    default:
      return state;
  }
}

