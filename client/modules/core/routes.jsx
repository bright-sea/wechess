import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import MainLayout from './components/MainLayout.jsx';

import NotFound from './containers/NotFound';
import Home from './containers/Home';

import Login from '../users/containers/Login.js';
import Register from '../users/containers/Register.js';
import Password from '../users/containers/Password.js';
import ResetPassword from '../users/containers/ResetPassword.js';

import Profile from '../users/containers/Profile.js';

import UsersCollection from '../users/containers/users/collection.js';
import UsersAdd from '../users/containers/users/add.js';
import UsersSingle from '../users/containers/users/single.js';
import UsersEdit from '../users/containers/users/edit.js';


import GoSgfList from '../go/containers/SgfList';
import GoSgf from '../go/containers/Sgf';
import GoGameList from '../go/containers/GameList';
import GoGame from '../go/containers/Game';
import GoNewGame from '../go/containers/NewGame';

import ChessPgnList from '../chess/containers/PgnList';
import ChessPgn from '../chess/containers/Pgn';
import ChessGameList from '../chess/containers/GameList';
import ChessGame from '../chess/containers/Game';
import ChessNewGame from '../chess/containers/NewGame';


function getRootNode(rootId: string) {
  const rootNode = document.getElementById(rootId);

  if (rootNode) {
    return rootNode;
  }

  const rootNodeHtml = '<div id="' + rootId + '"></div>';
  const body = document.getElementsByTagName('body')[0];
  body.insertAdjacentHTML('beforeend', rootNodeHtml);

  return document.getElementById(rootId);
}


export default function (injectDeps, {Meteor, Store}) {

  const history = syncHistoryWithStore(browserHistory, Store);
  const MainLayoutCtx = injectDeps(MainLayout);

  ReactDOM.render(
    <Provider store={Store}>
      <Router history={history}>
        <Route path="/" component={ MainLayoutCtx }>
          <IndexRoute component={ Home } />

          <Route path="register" component={ Register } />
          <Route path="verify-email/:token" component={ ResetPassword } />
          <Route path="login" component={ Login } />
          <Route path="password" component={ Password } />
          <Route path="reset-password/:token" component={ ResetPassword } />
          <Route path="profile" component={ Profile } />

          <Route path="users" component={ UsersCollection } />
          <Route path="users/add" component={ UsersAdd } />
          <Route path="users/edit/:_id" component={ UsersEdit } />
          <Route path="users/:_id" component={ UsersSingle } />


          <Route path="go/game" component={ GoGameList } />
          <Route path="go/game/create" component={ GoNewGame } />
          <Route path='go/game/:gameId' component={ GoGame } />
          <Route path="go/sgf" component={ GoSgfList } />
          <Route path='go/sgf/:sgfId' component={ GoSgf } />

          <Route path="chess/game" component={ ChessGameList } />
          <Route path="chess/game/create" component={ ChessNewGame } />
          <Route path='chess/game/:gameId' component={ ChessGame } />
          <Route path="chess/pgn" component={ ChessPgnList } />
          <Route path='chess/pgn/:pgnId' component={ ChessPgn } />


          <Route path="*" component={ NotFound } />
        </Route>
      </Router>
    </Provider>,
    getRootNode('container')
  );


};





