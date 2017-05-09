import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {fetchNotifications} from '../actions/notifications';

import Notifications from '../components/Notifications';

class NotificationsContainer extends Component {

  render() {
    return(
      <Notifications {...this.props} />
    )
  }

}

const mapStateToProps = (state) => {
  const { user, notifications } = state;
  return {
    user,
    notifications
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotifications: () => {
      dispatch(fetchNotifications())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
