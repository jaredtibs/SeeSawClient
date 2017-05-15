import React, { Component } from 'react';
import {connect} from 'react-redux';
import Main from '../components/Main';
import {
  fetchCurrentLocation,
  changeCurrentLocation,
  findingLocation
} from '../actions/location';

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
  const { user, location, feed, notifications } = state;
  return {
    user,
    location,
    feed,
    notifications
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentLocation: (data) => {
      dispatch(fetchCurrentLocation(data))
    },

    changeCurrentLocation: (data) => {
      dispatch(changeCurrentLocation(data))
    },

    findingLocation: () => {
      dispatch(findingLocation())
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
