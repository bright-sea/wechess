import React from 'react';

import Paper from 'material-ui/lib/paper';
import Formsy from 'formsy-react';

import { FormsyText } from 'formsy-material-ui';
import RaisedButton from 'material-ui/lib/raised-button';

export default React.createClass({

  getInitialState() {
    return {
      validatePristine: true,
      disabled: false,
      canSubmit: false
    };
  },

  render() {

    const styles ={
      page:{
        padding:20,
      },
      button: {
        margin:10,
      },
      submitButton:{
        marginRight:20,
        marginTop: 20,
      },
      errMessage: {
        color: "red",
      },
      row: {
        display: 'block',
        margin: 20
      },
    };

    return (

      <div style={styles.page}>

        <h3>您的帐户资料</h3>

      </div>
    );

  }
});
