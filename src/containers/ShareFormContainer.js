import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {createPost} from '../actions/feed';
import {fetchSuggestedUsers} from '../actions/share';

import ShareForm from '../components/ShareForm';

class ShareFormContainer extends Component {
  render() {
    return(
      <ShareForm {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  const { user, location, feed, share} = state;
  return {
    user,
    location,
    feed,
    share
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (locationId, text, visibility) => {
      dispatch(createPost(locationId, text, visibility))
    },

    fetchSuggestedUsers: () => {
      dispatch(fetchSuggestedUsers())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareFormContainer)
