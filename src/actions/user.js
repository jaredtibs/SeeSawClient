import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';

export function requestLogin (username, password) {
  return dispatch => {
    dispatch(loading());
    return fetch("http://localhost:3000/api/v1/sessions", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then((response) => response.json())
    .then((responseData) => dispatch(receiveSession(responseData.token, username)))
    .catch(error => console.log(error))
  }
}

export function checkUserSession() {
  return dispatch => {
    store.get('userToken')
    .then(token => {
      if (token) {
        dispatch(fetchUserSession(token));
        Actions.main({type: 'reset'});
      } else {
        Actions.landing({type: 'reset'});
      }
    })
  }
}

export function fetchUserSession(token) {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/sessions", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      }
    })
    .then((response) => response.json())
    .then((responseData) => dispatch(sessionFetched(responseData.data)))
    .catch(error => console.log(error))
  }
}

export function sessionFetched(data) {
  return {
    type: "SESSION_FETCHED",
    data: data.attributes
  }
}

export function finishRegister(token, username) {
  return dispatch => {
    dispatch(receiveSession(token, username));
    dispatch(pushToMain(false));
  }
}

export function receiveSession (token, username) {
  store.save('userToken', token);

  return {
    type: "LOGGED_IN",
    username: username
  }
}

export function handleError (errors) {
  return {
    type: "REGISTER_ERROR",
    errors: errors
  }
}

export function pushToMain(reset) {
  if (reset) {
    Actions.main(type: 'reset');
  } else {
    Actions.main();
  }
}

export function register (email, username, password) {
  return dispatch => {
    dispatch(loading());
    return fetch("http://localhost:3000/api/v1/registrations", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.errors) {
        dispatch(handleError(responseData.errors))
      } else {
        dispatch(finishRegister(responseData.token, username))
      }
    })
    .catch(error => console.log(error))
  }
}

export function logout() {
  store.get('userToken')
  .then(token => {
    if (token) {
      store.delete('userToken');
      Actions.landing({type: 'reset'});
    }
  })

  return {
    type: "LOGGED_OUT"
  };
}

export function loading() {
  return {
    type: "LOADING"
  }
}

export function updateAvatar(data) {
  //let token = await fetchToken();
  //console.log(token)
  return dispatch => {
    dispatch(loading());
    return fetch("http://localhost:3000/api/v1/user/avatar", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file: data["file"]
      })
    })
    .then((response) => response.json())
    .then((responseData) => dispatch(userAvatarUpdated(responseData)))
    .catch(error => console.error(error))
  }
}

export function userAvatarUpdated(data) {
  const avatar = data.data.attributes.avatar.url;
  return {
    type: "AVATAR_UPDATED",
    avatar: avatar
  }
}

async function fetchToken() {
  let token;
  try {
    token = await store.get('userToken');
    return token
  } catch(e) {
    console.error(e)
  }
}
