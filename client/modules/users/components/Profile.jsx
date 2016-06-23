import React from 'react';

import Paper from 'material-ui/Paper';
import Formsy from 'formsy-react';

import { FormsyText } from 'formsy-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

export default class extends React.Component {

  constructor(props){
    super(props);

    this.state= {
      validatePristine: true,
      disabled: false,
      canSubmit: false,
    };
  }

  render() {
    const {i18n} = this.props;

    const styles ={
      header: {
        textAlign:"center",
        padding:20,
        fontWeight: "bold",
      },
    };

    return (
      <div>

        <div style={styles.header}>
          {i18n.Profile}
        </div>

      </div>
    );
  }
};
