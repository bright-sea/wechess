import Password from '../components/Password.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { connect } from 'react-redux'
import { push } from 'react-router-redux';

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Store} = context();

  if (Meteor.subscribe('users.current').ready()) {
    const record = Meteor.users.findOne(Meteor.userId());

    if (!record){
      Store.dispatch(push("/login"));;
    }else{
      onData(null, {record});
    }
  }

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitPasswordAction: actions.account.password,
  clearErrors: actions.account.passwordErrorClear,
  context: () => context,
});

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
    passwordError: state.error.passwordError,
  }
};

export default composeAll(
  connect(mapStateToProps),
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Password);
