import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {requestLogin} from '../actions/user';

import Login from '../components/Login';

class LoginContainer extends Component {
  render() {
    return(
      <Login {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return user
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestLogin: (loginValue, password) => {
      dispatch(requestLogin(loginValue, password))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
