import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import Feed from '../components/Feed';
import {fetchPosts, toggleFeed, castVote} from '../actions/feed';

class FeedContainer extends Component {
  render() {
    return(
      <Feed {...this.props} />
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
    },

    toggleFeed: (type, locationId) => {
      dispatch(toggleFeed(type, locationId))
    },

    castVote: (postId, type) => {
      dispatch(castVote(postId, type))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
