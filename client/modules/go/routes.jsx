import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '../core/components/MainLayout.jsx';

import SgfList from './containers/SgfList';
import Sgf from './containers/Sgf';
import GameList from './containers/GameList';
import Game from './containers/Game';

import NewGame from './containers/NewGame';


export default function (injectDeps, {FlowRouter}) {

  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/go/sgf', {
    name: 'go.sgf.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<SgfList />)
      });
    }
  });

  FlowRouter.route('/go/sgf/:sgfId', {
    name: 'go.sgf.single',
    action({sgfId}) {
      mount(MainLayoutCtx, {
        content: () => (<Sgf sgfId={sgfId}/>)
      });
    }
  });

  FlowRouter.route('/go/game', {
    name: 'go.game.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<GameList />)
      });
    }
  });

  FlowRouter.route('/go/game/create', {
    name: 'go.game.create',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NewGame />)
      });
    }
  });



  FlowRouter.route('/go/game/:gameId', {
    name: 'go.game.single',
    action({gameId}) {
      mount(MainLayoutCtx, {
        content: () => (<Game gameId={gameId}/>)
      });
    }
  });


}
