import store from 'react-native-simple-store';

export function fetchCurrentLocation (data) {
  return dispatch => {
    store.get('userToken')
    .then(token => {
      dispatch(findingLocation());
      return fetch("http://localhost:3000/api/v1/locations/current", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token
        },
        body: JSON.stringify({
          place_id: data["place_id"],
          name: data["name"],
          latitude: data["latitude"],
          longitude: data["longitude"]
        })
      })
      .then((response) => response.json())
      .then((responseData) => dispatch(setLocation(responseData)))
      .catch(error => console.error(error))
    });
  }
}

export function setLocation(locationData) {
  return {
    type: "LOCATION_FOUND",
    data: locationData
  };
}

export function findingLocation() {
  return {
    type: "FINDING_LOCATION"
  }
}

export function postCountChanged(type) {
  if (type == "create") {
    return {
      type: "POST_COUNT_INCREASED"
    }
  } else {
    return {
      type: "POST_COUNT_DECRESED"
    }
  }
}

export function voteCountChanged(type) {
  if (type == "upvote") {
    return {
      type: "VOTE_COUNT_INCREASED"
    }
  } else {
    return {
      type: "VOTE_COUNT_DECREASED"
    }
  }
}

export function scrolledDown() {
  return {
    type: "LOCATION_SCROLL_DOWN"
  }
}

export function scrolledUp() {
  return {
    type: "LOCATION_SCROLL_UP"
  }
}
