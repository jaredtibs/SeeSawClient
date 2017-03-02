import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/feed';

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
    fetchPosts: (locationId, type) => {
      dispatch(fetchPosts(locationId, type))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationContainer)
