const initialState = {
  notifications: [],
  unreadCount: 0
}

export default function notifications(state = initialState, action) {
  switch(action.type) {
    case 'NOTIFICATIONS_FETCHED':
      return {
        ...state,
        notifications: action.data
      }
    default:
      return state;
  }
}
