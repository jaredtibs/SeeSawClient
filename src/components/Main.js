import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ListView,
  ScrollView,
  Image,
  NativeModules,
  Alert
} from 'react-native';

import TabBar from '../components/TabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import LocationContainer from '../containers/LocationContainer';
import ProfileContainer from '../containers/ProfileContainer';

import Permissions from 'react-native-permissions';

// Factual Engine **
const Engine = NativeModules.Engine;

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      locationPermission: ''
    }
  }

  componentDidMount() {
    Permissions.getPermissionStatus('location', 'always')
      .then(response => {
        if (response != "authorized") {
          this._alertForLocationPermission();
        } else {
          this._getUserLocation();
        }
    })

    //TODO remove
    //navigator.geolocation.getCurrentPosition(
    // (position) => {
    //  var initialPosition = JSON.stringify(position);
    //  console.log(initialPosition);
    //},
    //(error) => alert(JSON.stringify(error)),
    //{enableHighAccuracy: true, timeout: 20000, maximumAge: 0}
    //);
  }

  //TODO might want to move this to the Intro component, request there,
  //then check when this component loads

  _requestPermission() {
    Permissions.requestPermission('location', 'always')
      .then(response => {
        this.setState({ locationPermission: response })
    })
  }

  /*
  Alert.alert(
    'Alert Title',
    'My Alert Msg',
    [
      {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
  )
  */


  //TODO might need to add the locationPermission state to the global store, set it on the intro and then reference it here
  // OR, you can check for it every time this component mounts and before this function is called, so you always know...?
  _alertForLocationPermission() {
    Alert.alert(
      'Your location',
      'Can we have your location so we can make this app awesome?',
      [ {text: 'Not now', onPress: () => console.log('permission denied'), style: 'cancel'},
        this.state.locationPermission == 'undetermined' ?
        {text: 'OK', onPress: () => this._requestPermission.bind(this) }
          : {text: 'Open Settings', onPress: Permissions.openSettings}
      ]
    )
  }

  async _getUserLocation() {
    try {
      const locations = await Engine.getCurrentLocations();
      console.log(locations);

      if (locations["places"] && locations["places"].length > 0) {
        const bestCandidate = locations["places"][0];
        this.props.fetchCurrentLocation(bestCandidate);
      } else {
        this._getUserLocation();
        //this.props.findingLocation();
      }

    } catch(e) {
      console.error(e);
    }
  }

  renderProfile() {
    const {dispatch, navigator} = this.props

    return (
      <ProfileContainer
        dispatch={dispatch}
        navigator={navigator} />
    )
  }

  renderLocation () {
    const {dispatch, navigator} = this.props

    return (
      <View tabLabel="location" style={styles.tabView}>
        <LocationContainer
          dispatch={dispatch}
          tabLabel="location"/>
      </View>
    )
  }

  renderLocationLoadingState() {
    return(
      <View style={styles.locationLoadingState} tabLabel="location">
        <Text style={styles.loadingText}> Finding your location... </Text>
      </View>
    )
  }

  render() {
    const fetchingLocation = this.props.location.findingLocation

    return(
      <View style={styles.container}>
        <ScrollableTabView
          locked={true}
          initialPage={1}
          renderTabBar={() => <TabBar location={this.props.location} user={this.props.user} />}
          tabBarPosition='overlayTop'>

          <View tabLabel="profile" style={styles.tabView}>
            {this.renderProfile()}
          </View>

          {fetchingLocation ?
            this.renderLocationLoadingState() :
            this.renderLocation()
          }

          <ScrollView tabLabel="ios-settings-outline" style={styles.tabView}>
            {null}
          </ScrollView>
        </ScrollableTabView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F7',
  },

  tabView: {
    flex: 1
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
