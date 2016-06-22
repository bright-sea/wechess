import React from 'react';

import Formsy from 'formsy-react';

import { FormsyText } from 'formsy-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

export default class extends React.Component {

  constructor(props){
    super(props);

    this.state= {
      validatePristine: true,
      disabled: false,
      canSubmit: false,
    };
  }

  resetForm() {
    // console.log('resetForm');
    this.refs.form.reset();
  }

  validSubmit(data) {
    if (this.props._id) {
      this.props.submitAction(data, this.props._id);
    } else {
      this.props.submitAction(data);
    }
  }
  // invalidSubmit() {
  invalidSubmit() {
    // console.log('invalidSubmit', data);
  }

  enableButton() {
    // console.log('enable button');
    this.setState({ canSubmit: true });
  }

  disableButton() {
    // console.log('disable button');
    this.setState({ canSubmit: false });
  }

  render() {
    const {_id, error, email } = this.props;

    const sharedProps = {
      validatePristine: this.state.validatePristine,
      disabled: this.state.disabled,
    };

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

        <h3>{_id ? '编辑 ' + email : '增加新用户'}</h3>

        <Formsy.Form
          onValidSubmit={this.validSubmit.bind(this)}
          onInvalidSubmit={this.invalidSubmit.bind(this)}
          onValid={this.enableButton.bind(this)}
          onInvalid={this.disableButton.bind(this)}
          onChange={this.onChange}
          ref="form">

          <FormsyText
            {...sharedProps}
            style={styles.row}
            name='firstName'
            hintText="输入名"
            value=""
            floatingLabelText="名"
          />

          <FormsyText
            {...sharedProps}
            style={styles.row}
            name='lastName'
            hintText="输入姓"
            value=""
            floatingLabelText="姓"
          />

          <FormsyText
            {...sharedProps}
            style={styles.row}
            name="email"
            validations="isEmail"
            validationError="请提供一个有效的邮箱地址"
            required
            hintText="输入一个邮箱地址"
            value={email}
            floatingLabelText="邮箱地址"
          />

          {error ?
          <div style={styles.errMessage}>
            {error}
          </div> : null }


          <div style={styles.row}>
            <RaisedButton
              style={styles.submitButton}
              type="submit"
              primary={true}
              label="保存"
              icon={<FontIcon className="fa fa-save"/>}
              disabled={!this.state.canSubmit}
            />

          </div>


        </Formsy.Form>

      </div>
    );
  }
};


//import React from 'react';
//import Paper from 'material-ui/Paper';
//import t from 'tcomb-form';
//
//export default React.createClass({
//
//
//  submitForm(event) {
//    event.preventDefault();
//    var values = this.refs.form.getValue();
//    if (values) {
//      // console.log('submitForm values', values);
//      if (this.props._id) {
//        this.props.submitAction(values, this.props._id);
//      } else {
//        this.props.submitAction(values);
//      }
//    }
//  },
//
//  onChange() {
//    this.refs.form.getValue(); // <- validate on every change
//  },
//
//  render() {
//
//    const formModel = t.struct({
//      firstName: t.String,
//      lastName: t.String,
//      email: t.String
//      // ,content: t.maybe(t.String)
//    });
//
//    const formOptions = {
//      config: {
//      },
//      fields: {
//        // title : {
//        //
//        // }
//        // ,content: {
//        //   type: 'textarea'
//        //   ,label: 'To jest kontent'
//        //   ,attrs: {
//        //     rows :3
//        //   }
//        // }
//      }
//    };
//
//    const debug = true;
//    // const {_id, error, record, email } = this.props;
//    const {_id, error, email } = this.props;
//
//    const defaultValues = {
//      ...this.props
//    };
//
//    const Form = t.form.Form;
//
//    const formTitle = _id ? 'Edit ' + email : 'Add new record';
//    const buttonLabel = 'Save';
//
//    return (
//      <Paper>
//
//        <h3>{formTitle}</h3>
//
//        {error ?
//        <div>
//          {error}
//        </div> : null }
//
//        <Form ref="form"
//              type={formModel}
//              options={formOptions}
//              onChange={this.onChange}
//              value={defaultValues}
//        />
//
//        <button onClick={this.submitForm}>{buttonLabel}</button>
//        {debug ? <button onClick={this.componentLog}>component log</button> : null }
//
//      </Paper>
//    );
//  }
//});
