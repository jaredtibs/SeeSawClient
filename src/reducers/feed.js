const initialState = {
  posts: [],
  postPublishing: false,
  isFetching: false,
  currentFeedType: 'recent'
};

var update = require('react/lib/update')

export default function feed(state = initialState, action) {
  switch(action.type) {
    case 'POST_PUBLISHING':
      return {
        ...state,
        postPublishing: true
      }
    case 'POST_PUBLISHED':
      let posts = state.posts;

      if (state.currentFeedType === 'recent') {
        posts.unshift(action.data);
      } else {
        posts.push(action.data);
      }

      return Object.assign({}, state, {
        posts: posts,
        postPublishing: false
      });
    case 'FETCHING_POSTS':
      return {
        ...state,
        isFetching: true
      }
    case 'POSTS_FETCHED':
      return {
        ...state,
        isFetching: false,
        posts: action.data['posts'],
        currentFeedType: action.data['type']
      }
    case 'POST_UPDATED':
      const updatedPosts = state.posts;
      const index = updatedPosts.findIndex(item => item.id === action.data.id);
      updatedPosts[index] = action.data
      return {
        ...state,
        posts: updatedPosts
      }
    case 'TOGGLE_FEED':
      return {
        ...state,
        currentFeedType: action.data
      }
    default:
      return state;
  }
}
