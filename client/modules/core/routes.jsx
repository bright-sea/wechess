import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './components/MainLayout.jsx';
import injectProvider from './injectProvider';

import NotFound from './containers/NotFound';
import Home from './containers/Home';


export default function (injectDeps, {FlowRouter, Meteor}) {
  //const MainLayoutCtx = injectDeps(MainLayout);
  const MainLayoutCtx = injectProvider(injectDeps, MainLayout);

  FlowRouter.route('/', {
    name: 'home',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Home />)
      });
    }
  });

  FlowRouter.notFound = {
    name: '404',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NotFound/>)
      });
    }
  };
}
