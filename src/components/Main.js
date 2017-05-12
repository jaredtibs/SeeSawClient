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
      return(
        {
          key: index++,
          label: location['name'],
          placeId: location['place_id'],
          latitude: location['latitude'],
          longitude: location['longitude']
        }
      )
    });

    console.log(otherLocations);
    /*
    place id, name, lat, long needed in array
    let index = 0;
    const data = [
        { key: index++, section: true, label: 'Fruits' },
        { key: index++, label: 'Red Apples' },
        { key: index++, label: 'Cherries' },
        { key: index++, label: 'Cranberries' },
        { key: index++, label: 'Pink Grapefruit' },
        { key: index++, label: 'Raspberries' },
        { key: index++, section: true, label: 'Vegetables' },
        { key: index++, label: 'Beets' },
        { key: index++, label: 'Red Peppers' },
        { key: index++, label: 'Radishes' },
        { key: index++, label: 'Radicchio' },
        { key: index++, label: 'Red Onions' },
        { key: index++, label: 'Red Potatoes' },
        { key: index++, label: 'Rhubarb' },
        { key: index++, label: 'Tomatoes' }
    ];
    */
  }

  _changeTabScene(name) {
    if (name == 'profile') {
      Actions.profile();
    } else {
      Actions.notifications();
    }
  }

  renderLocation () {
    const {dispatch } = this.props;

    return (
      <View style={{flex: 1}}>
        <LocationContainer dispatch={dispatch} />
      </View>
    )
  }

  renderLocationLoadingState() {
    return(
      <View style={styles.locationLoadingState}>
        <Text style={styles.loadingText}> Finding your location... </Text>
      </View>
    )
  }

  render() {
    const fetchingLocation = this.props.location.findingLocation

    return(
      <View style={styles.container}>
        <TopNavBar
          location={this.props.location}
          user={this.props.user}
          otherLocations={this.state.otherLocations}
          changeTabScene={this._changeTabScene}
        />
        <ScrollView
          contentContainerStyle={styles.mainScrollView}
          scrollsToTop={true}
        >
          {fetchingLocation ?
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
    color: '#848388',
    fontFamily: 'Calibre-Regular'
  }
})

export default Main;
