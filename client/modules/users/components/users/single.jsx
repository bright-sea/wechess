import React from 'react';

import styles from '../../../../libs/styles.js';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';


export default class extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };


  deleteRecord() {
    console.log('deleteRecord ', this.props._id);
    this.props.deleteAction(this.props._id);
  }

  render() {
    const {_id, email, firstName, lastName, error} = this.props;
    const {router} = this.context;

    return (
      <div style={styles.page}>
        <div style={styles.header}>用户 _id: {_id}</div>
        <div style={styles.row}>
          <p><strong>first name:</strong> {firstName}</p>
          <p><strong>last name:</strong> {lastName}</p>
          <p><strong>email:</strong> {email}</p>
        </div>

        <div style={styles.row}>
          <FlatButton
            style={styles.submitButton}
            primary={true}
            label="编辑"
            icon={<FontIcon className="fa fa-edit"/>}
            onTouchTap = {() => {router.push('/users/edit/' + _id);}}/>

          <FlatButton
            style={styles.submitButton}
            primary={true}
            label="删除"
            icon={<FontIcon className="fa fa-times"/>}
            onTouchTap = {this.deleteRecord.bind(this)}/>
        </div>

        {error ?
        <div style={styles.errMessage}>
          {error}
        </div> : null }
      </div>
    );
  }
};

