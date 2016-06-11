import React from 'react';

import { Provider } from 'react-redux';
import { useDeps, composeAll } from 'mantra-core';

export default (injectDeps, Component) => {
  const provider = (C1) => {
    return (props) => {
      const {store, ...otherProps} = props;
      return (
        <Provider store={store}>
        <C1 {...otherProps} />
      </Provider>
      );
    };
  };

  const mapper = (context) => ({
    store: context.Store
  });

  return composeAll(provider, useDeps(mapper), injectDeps)(Component);
};