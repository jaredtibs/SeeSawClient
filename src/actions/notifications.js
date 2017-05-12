import store from 'react-native-simple-store';

export function fetchNotifications () {
  return dispatch => {
    store.get('userToken')
    .then(token => {
      let url = `http://localhost:3000/api/v1/user/notifications`;
      return fetch(url, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token
        },
      })
      .then((response) => response.json())
      .then((responseData) => dispatch(notificationsFetched(responseData.data)))
      .catch(error => console.log(error))
    });
  }
}

export function markNotificationsAsRead() {
  return dispatch => {
    store.get('userToken')
    .then(token => {
      let url = `http://localhost:3000/api/v1/user/notifications`;
      return fetch(url, {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token
        },
      })
      .then((response) => response.json())
      .then((responseData) => dispatch(notificationsFetched(responseData.data)))
      .catch(error => console.log(error))
    });
  }
}

export function notificationsFetched(notifications) {
  return {
    type: "NOTIFICATIONS_FETCHED",
    data: notifications
  }
}
