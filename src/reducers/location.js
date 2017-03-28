const initialState = {
  data: null,
  findingLocation: true,
  locationFound: false,
  scrolledLocationNav: false,
  postCount: 0
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
    case 'POST_COUNT_INCREASED':
      return {
        ...state,
        postCount: (state.postCount + 1)
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
