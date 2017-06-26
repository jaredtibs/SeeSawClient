import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';

export function searchUsers (query) {
  return dispatch => {
    store.get('userToken')
    .then(token => {
      dispatch(searchingUsers());
      return fetch(`http://localhost:3000/api/v1/search/users?query=${query}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token
        },
      })
      .then((response) => response.json())
      .then((responseData) => dispatch(searchResultsReceived(responseData)))
      .catch(error => console.error(error))
    });
  }
}

export function searchingUsers() {
  return {
    type: "SEARCHING_USERS"
  };
}

export function searchResultsReceived(users) {
  return {
    type: "SEARCH_RESULTS_RECEIVED",
    data: users
  }
}

export function fetchSuggestedUsers () {
  return dispatch => {
    store.get('userToken')
    .then(token => {
      return fetch("http://localhost:3000/api/v1/users", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token
        },
      })
      .then((response) => response.json())
      .then((responseData) => dispatch(suggestedUsersFetched(responseData)))
      .catch(error => console.error(error))
    });
  }
}

export function suggestedUsersFetched(users) {
  return {
    type: "SUGGESTED_USERS_FETCHED",
    data: users
  }
}

export function selectUser(user) {
  Actions.shareForm({refresh: {keyboardShown: true}});
  return {
    type: "USER_SELECTED",
    data: user
  }
}

export function clearSelectedUser() {
  return {
    type: "SELECTED_USER_CLEARED"
  }
}

export function resetShareSettings() {
  return {
    type: "SHARE_SETTINGS_RESET"
  }
}
