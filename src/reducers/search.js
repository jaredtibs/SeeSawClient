const initialState = {
  searchingUsers: false,
  suggestedUsers: [],
  searchResults: [],
  selectedUser: {}
}

export default function search(state = initialState, action) {
  switch(action.type) {
    case 'SUGGESTED_USERS_FETCHED':
      return {
        ...state,
        suggestedUsers: action.data.data
      };
    case 'SEARCH_RESULTS_RECEIVED':
      return {
        ...state,
        searchingUsers: false,
        searchResults: action.data.data
      };
    case 'SEARCHING_USERS':
      return {
        ...state,
        searchingUsers: true
      };
    case 'USER_SELECTED':
      return {
        ...state,
        selectedUser: action.data
      };
    case 'SHARE_SETTINGS_RESET':
      return {
        ...state,
        selectedUser: {}
      };
    default:
      return state;
  }
}
