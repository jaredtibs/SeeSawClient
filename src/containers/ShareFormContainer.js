import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {createPost} from '../actions/feed';

import ShareForm from '../components/ShareForm';

class ShareFormContainer extends Component {
  render() {
    return(
      <ShareForm {...this.props} />
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
    createPost: (locationId, text) => {
      dispatch(createPost(locationId, text))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareFormContainer)
