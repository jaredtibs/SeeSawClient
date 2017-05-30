const initialState = {
  suggestedUsers: [],
  selectedUsers: []
}

export default function share(state = initialState, action) {
  switch(action.type) {
    case 'SUGGESTED_USERS_FETCHED':
      return {
        ...state,
        suggestedUsers: action.data.data
      };
    default:
      return state;
  }
}
