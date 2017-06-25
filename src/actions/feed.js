import store from 'react-native-simple-store';
import {postCountChanged} from '../actions/location.js'
import {resetShareSettings} from '../actions/search.js'

export function createPost (locationId, text, visibility, participants) {
  return dispatch => {
    dispatch(publishingPost());
    store.get('userToken')
    .then(token => {
      let url = `https://see-saw-api.herokuapp.com/api/v1/locations/${locationId}/posts`;
      return fetch(url, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token
        },
        body: JSON.stringify({
          body: text,
          visibility: visibility,
          direct_participants: participants
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        dispatch(postPublished(responseData));
        dispatch(postCountChanged("create"));
        dispatch(resetShareSettings());
      })
      .catch(error => console.log(error))
    });
  }
}

export function postPublished(postData) {
  return {
    type: "POST_PUBLISHED",
    data: postData.data
  }
}

export function publishingPost() {
  return {
    type: "POST_PUBLISHING"
  }
}

export function fetchPosts (locationId, type) {
  return dispatch => {
    store.get('userToken')
    .then(token => {
      dispatch(fetchingPosts());
      let url = `https://see-saw-api.herokuapp.com/api/v1/locations/${locationId}/posts?sort=${type}`;
      return fetch(url, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token
        },
      })
      .then((response) => response.json())
      .then((responseData) => dispatch(postsFetched(responseData.data, type)))
      .catch(error => console.log(error))
    });
  }
}

export function postsFetched(posts, type) {
  return {
    type: "POSTS_FETCHED",
    data: {posts: posts, type: type}
  }
}

export function fetchingPosts() {
  return {
    type: "FETCHING_POSTS"
  }
}

export function toggleFeed(type, locationId) {
  return dispatch => {
    dispatch(fetchPosts(locationId, type))
  }
}

export function castVote(postId, type) {
  return dispatch => {
    store.get('userToken')
    .then(token => {
      let url = `https://see-saw-api.herokuapp.com/api/v1/posts/${postId}/${type}`;
      return fetch(url, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token
        },
      })
      .then((response) => response.json())
      .then((responseData) => {
        dispatch(voteCasted(responseData.data))
      })
      .catch(error => console.log(error))
    });
  }
}

export function voteCasted(updatedPost) {
  return {
    type: "POST_UPDATED",
    data: updatedPost
  }
}
