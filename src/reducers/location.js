const initialState = {
  data: null,
  findingLocation: true,
  locationFound: false,
  editingLocation: false,
  scrolledLocationNav: false,
  newPostCount: null,
  newVoteCount: null,
  newPhotoCount: null
};

export default function location(state=initialState, action) {
  switch(action.type) {
    case 'FINDING_LOCATION':
      return {
        ...state,
        findingLocation: true,
        locationFound: false
      }
    case 'LOCATION_FOUND':
      return {
        ...state,
        data: action.data,
        findingLocation: false,
        locationFound: true
      }
    case 'EDITING_LOCATION':
      return {
        ...state,
        editingLocation: true
      }
    case 'POST_COUNT_CHANGED':
      let prevPostCount;
      if (state.newPostCount != null) {
        prevPostCount = state.newPostCount;
      } else {
        prevPostCount = state.data.data.attributes['post-count']
      }

      return {
        ...state,
        newPostCount: (prevPostCount + 1)
      }
    case 'PHOTO_COUNT_CHANGED':
      let prevPhotoCount = state.data.data.attributes['photo-count']
      return {
        ...state,
        newPhotoCount: (prevPhotoCount + 1)
      }
    case 'LOCATION_SCROLL_DOWN':
      return {
        ...state,
        scrolledLocationNav: true
      }
    case 'LOCATION_SCROLL_UP':
      return {
        ...state,
        scrolledLocationNav: false
      }
    default:
      return state;
  }
};
