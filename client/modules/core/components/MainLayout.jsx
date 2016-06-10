import React from 'react';
import ToolBar from '../containers/ToolBar.js';

import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

const darkMuiTheme = getMuiTheme(darkBaseTheme);



// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 50,
  },
});



export default ({content = () => null }) => (

  <MuiThemeProvider  muiTheme={muiTheme}>
    <div>

    <ToolBar />

    <div>
      {content()}
    </div>

    </div>
  </MuiThemeProvider>
);
