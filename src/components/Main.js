import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux'

import {
  View,
  Text,
  StyleSheet,
  ListView,
  ScrollView,
  Image,
  AppState,
  NativeModules
} from 'react-native';

import TopNavBar from '../components/TopNavBar';
import ShareButton from '../components/ShareButton';
import LocationContainer from '../containers/LocationContainer';

// Factual Engine **
const Engine = NativeModules.Engine;

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      appState: AppState.currentState,
      otherLocations: []
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this._getUserLocation();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this._getUserLocation();
    }
    this.setState({appState: nextAppState});
  }

  async _getUserLocation() {
    try {
      const locationData = await Engine.getCurrentLocations();
      console.log(locationData);

      if (locationData["places"] && locationData["places"].length > 0) {
        const currentLocation = locationData["places"].find(this._currentLocation);

        if (currentLocation) {
          this.props.fetchCurrentLocation(currentLocation);

          // set other locations to top 5 - currentLocation
          let otherLocations = locationData['places'].filter((l) => {
            return l["place_id"] != currentLocation["place_id"]
          }).slice(0, 5);

          console.log(otherLocations);

          this.setState({otherLocations: this._processOtherLocations(otherLocations)});
        } else {
          // fetch raw location
          this.props.fetchCurrentLocation({
            latitude: locationData["latitude"],
            longitude: locationData["longitude"]
          });

          // set other locations to top 5
          let otherLocations = locationData['places'].slice(0, 5)
          this.setState({otherLocations: this._processOtherLocations(otherLocations)});
        }
      } else {
        this._getUserLocation();
        //this.props.findingLocation();
      }

    } catch(e) {
      console.error(e);
    }
  }

  _currentLocation(location) {
    return location.threshold_met === 'low'
  }

  _processOtherLocations(locations) {
    let index = 0;
    const otherLocations = locations.map((location) => {
      if (index === 0) {
        return(
          {
            key: index++,
            label: "Nearby locations",
            section: true
          }
        )
      } else {
        return(
          {
            key: index++,
            label: location['name'],
            name: location['name'],
            place_id: location['place_id'],
            latitude: location['latitude'],
            longitude: location['longitude']
          }
        )
      }
    });

    return otherLocations;
  }

  _changeLocation(data) {
    //need to replace the location chosen (data) with the current location
    //this.setState({otherLocations: })
    //let otherLocations = this.state.otherLocations;
    //var chosenIndex = otherLocations.findIndex(item => item['place_id'] == data['place_id']);
    //this.setState({otherLocations: otherLocations})
    this.props.changeCurrentLocation(data);
  }

  _changeTabScene(name) {
    if (name == 'profile') {
      Actions.profile();
    } else {
      Actions.notifications();
    }
  }

  renderLocation () {
    const { dispatch } = this.props;

    return (
      <View style={{flex: 1}}>
        <LocationContainer dispatch={dispatch} />
      </View>
    )
  }

  renderLocationLoadingState() {
    return(
      <View style={styles.locationLoadingState}>
        <Text style={styles.loadingText}>
          { this.props.location.updatingLocation ?
            "Updating your location..."
            :
            "Finding your location..."
          }
        </Text>
      </View>
    )
  }

  render() {
    const { findingLocation, updatingLocation } = this.props.location;

    return(
      <View style={styles.container}>
        <TopNavBar
          location={this.props.location}
          user={this.props.user}
          otherLocations={this.state.otherLocations}
          notificationCount={this.props.notifications.unreadCount}
          changeTabScene={this._changeTabScene.bind(this)}
          changeLocation={this._changeLocation.bind(this)}
        />
        <ScrollView
          contentContainerStyle={styles.mainScrollView}
          scrollsToTop={true}
        >
          {(findingLocation || updatingLocation) ?
            this.renderLocationLoadingState() :
            this.renderLocation()
          }
        </ScrollView>

        <ShareButton />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F7',
  },

  mainScrollView: {
    flex: 1,
  },

  locationLoadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    fontSize: 14,
    color: '#848388',
    fontFamily: 'MaisonNeueTRIAL-Demi'
  }
})

export default Main;
