import React, { Component } from 'react';
import {connect} from 'react-redux';
import Main from '../components/Main';
import {fetchCurrentLocation, findingLocation} from '../actions/location';

class MainContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Main {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  const { user, location, feed } = state;
  return {
    user,
    location,
    feed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentLocation: (placeId) => {
      dispatch(fetchCurrentLocation(placeId))
    },

    findingLocation: () => {
      dispatch(findingLocation())
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
