const initialState = {
  data: null,
  findingLocation: true,
  locationFound: false
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
    default:
      return state;
  }
};
