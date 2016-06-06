import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/MainLayout.jsx';

import PgnList from './containers/PgnList';
import Pgn from './containers/Pgn';
import GameList from './containers/GameList';
import Game from './containers/Game';

import NewGame from './containers/NewGame';

export default function (injectDeps, {FlowRouter}) {

  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/chess/pgn', {
    name: 'chess.pgn.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<PgnList />)
      });
    }
  });

  FlowRouter.route('/chess/pgn/:pgnId', {
    name: 'chess.pgn.single',
    action({pgnId}) {
      mount(MainLayoutCtx, {
        content: () => (<Pgn pgnId={pgnId}/>)
      });
    }
  });

  FlowRouter.route('/chess/game', {
    name: 'chess.game.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<GameList />)
      });
    }
  });

  FlowRouter.route('/chess/game/create', {
    name: 'chess.game.create',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NewGame />)
      });
    }
  });


  FlowRouter.route('/chess/game/:gameId', {
    name: 'chess.game.single',
    action({gameId}) {
      mount(MainLayoutCtx, {
        content: () => (<Game gameId={gameId}/>)
      });
    }
  });

}
