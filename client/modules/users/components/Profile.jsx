import React from 'react';

import Formsy from 'formsy-react';

import { FormsyText } from 'formsy-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

export default class extends React.Component {

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

        <h3>您的个人信息</h3>

      </div>
    );
  }
};
