import * as Collections from '../../lib/collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tracker} from 'meteor/tracker';

let Messages = {};

Messages['en-US'] = require('../../lib/i18n/lang/en-US.json');
Messages['zh-CN'] = require('../../lib/i18n/lang/zh-CN.json');

let language = navigator.language || navigator.userLanguage;
var locale = language.split('-');

locale = locale[1] ? `${locale[0]}-${locale[1].toUpperCase()}` : language;

locale = 'zh-CN';

var i18n = Messages[locale] ? Messages[locale] : Messages['en-US'];
i18n = Object.assign(Messages['en-US'], i18n);

let LocalState = new ReactiveDict();


export default function () {
  return {
    Meteor,
    FlowRouter,
    Collections,
    LocalState,
    Tracker,
    i18n,
  };
}
