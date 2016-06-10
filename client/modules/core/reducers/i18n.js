let Messages = {};

Messages['en-US'] = require('../../../../lib/i18n/lang/en-US.json');
Messages['zh-CN'] = require('../../../../lib/i18n/lang/zh-CN.json');

//let language = navigator.language || navigator.userLanguage;
//var locale = language.split('-');
//
//locale = locale[1] ? `${locale[0]}-${locale[1].toUpperCase()}` : language;
//
//var i18n = Messages[locale] ? Messages[locale] : Messages['en-US'];
//i18n = Object.assign(Messages['en-US'], i18n);

export default function(state = Messages['en-US'], action) {

  switch (action.type) {
    case 'SWITCH_LOCALE':
      return Messages[action.locale];
    default:
      return state;
  }
}

