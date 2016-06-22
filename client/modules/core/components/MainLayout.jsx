import React from 'react';

import {cyan500} from 'material-ui/styles/colors';

import {
  MuiThemeProvider,
  getMuiTheme,
} from 'material-ui/styles';

import ToolBar from '../containers/ToolBar.js';

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    //textColor: cyan500,
  },
  toolbar: {
    height: 48,
    backgroundColor: "lightseagreen",
  },
});


export default (props) => (

  <MuiThemeProvider  muiTheme={muiTheme}>
    <div>
      <ToolBar />
      {props.children}
    </div>
  </MuiThemeProvider>
);


