import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import Notifications from '../components/Notifications';

class NotificationsContainer extends Component {

  render() {
    return(
      <Notifications {...this.props} />
    )
  }

}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(NotificationsContainer)
