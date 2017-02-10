import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import Location from '../components/Location';

class LocationContainer extends Component {
  render() {
    return(
      <Location {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  const { user, location, feed} = state;
  return {
    user,
    location,
    feed
  }
};

export default connect(mapStateToProps)(LocationContainer)
