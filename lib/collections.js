import {Mongo} from 'meteor/mongo';

export const Sgfs = new Mongo.Collection('sgfs');
export const Pgns = new Mongo.Collection('pgns');

export const GoGames = new Mongo.Collection('gogames');
export const ChessGames = new Mongo.Collection('chessgames');

