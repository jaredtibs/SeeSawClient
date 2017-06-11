import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';

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
