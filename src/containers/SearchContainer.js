import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {
  fetchSuggestedUsers,
  selectUser,
  searchUsers
} from '../actions/search';

import ShareSearch from '../components/ShareSearch';

class SearchContainer extends Component {
  render() {
    return(
      <ShareSearch { ...this.props } />
    )
  }
}

const mapStateToProps = (state) => {
  const { search } = state;
  return search;
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSuggestedUsers: () => {
      dispatch(fetchSuggestedUsers())
    },

    selectUser: (user) => {
      dispatch(selectUser(user))
    },

    searchUsers: (input) => {
      dispatch(searchUsers(input))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
