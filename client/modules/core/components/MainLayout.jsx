import React from 'react';
import ToolBar from '../containers/ToolBar.js';

const MainLayout = ({content = () => null }) => (

  <div>

    <ToolBar />

    <div>
      {content()}
    </div>

  </div>
);

export default MainLayout;
