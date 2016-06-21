import React from 'react';

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

    const styles ={
      page:{
        padding:20,
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
        <h3>用户 _id: {_id}</h3>
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
            onTouchTap = {() => {this.context.router.push('/users/' + _id + '/edit');}}/>

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

