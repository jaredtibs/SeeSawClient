import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {logout} from '../actions/user';

import Profile from '../components/Profile';

class ProfileContainer extends Component {
  render() {
    return(
      <Profile {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  const { user, feed} = state;
  return {
    user,
    feed
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
