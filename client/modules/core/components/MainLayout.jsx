import React from 'react';
import ToolBar from '../containers/ToolBar.js';

export default ({content = () => null }) => (

  <div>

    <ToolBar />

    <div>
      {content()}
    </div>

  </div>
);
