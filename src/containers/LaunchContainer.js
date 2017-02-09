import React, { Component } from 'react';
import {connect} from 'react-redux';
import Launch from '../components/Launch';
import {checkUserSession} from '../actions/user';

class LaunchContainer extends Component {
  render() {
    return(
      <Launch {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkUserSession: () => dispatch(checkUserSession())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchContainer)
