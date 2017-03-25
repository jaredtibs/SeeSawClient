import store from 'react-native-simple-store';

export function fetchCurrentLocation (data) {
  return dispatch => {
    store.get('userToken')
    .then(token => {
      dispatch(findingLocation());
      console.log(data)
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
          category_ids: data["category_ids"],
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
