const initialState = {
  suggestedUsers: [],
  selectedUser: {}
}

export default function search(state = initialState, action) {
  switch(action.type) {
    case 'SUGGESTED_USERS_FETCHED':
      return {
        ...state,
        suggestedUsers: action.data.data
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
