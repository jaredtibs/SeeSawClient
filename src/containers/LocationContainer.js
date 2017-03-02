import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {scrolledLocation} from '../actions/location';

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

const mapDispatchToProps = (dispatch) => {
  return {
    scrolledLocation: (scrollValue) => {
      dispatch(scrolledLocation(scrollValue))
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationContainer)
