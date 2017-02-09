import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Register from '../components/Register';
import {register} from '../actions/user';

class RegisterContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Register {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return user
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (email, username, password) => {
      dispatch(register(email, username, password))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
