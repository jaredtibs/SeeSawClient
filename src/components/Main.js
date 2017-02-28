import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ListView,
  ScrollView,
  Image,
  NativeModules
} from 'react-native';

import TabBar from '../components/TabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import LocationContainer from '../containers/LocationContainer';
import ProfileContainer from '../containers/ProfileContainer';

// Factual Engine **
const Engine = NativeModules.Engine;

class Main extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this._getUserLocation();
    //navigator.geolocation.getCurrentPosition(
    // (position) => {
    //   var initialPosition = JSON.stringify(position);
    //   console.log(initialPosition);
    // },
    // (error) => alert(JSON.stringify(error)),
    // {enableHighAccuracy: true, timeout: 20000, maximumAge: 0}
    //);
  }

  async _getUserLocation() {
    try {
      const locations = await Engine.getCurrentLocations();
      console.log(locations);

      //TODO temporary - remove
      this.props.fetchCurrentLocation({
        place_id: "f94bb932-24c4-433c-b6c4-8e9f5e83cb5a",
        name: "Apple HQ",
       category_ids: []
      });


        /*
      if (locations["places"] && locations["places"].length > 0) {
        const bestCandidate = locations["places"][0];
        this.props.fetchCurrentLocation(bestCandidate);
      } else {
        this._getUserLocation();
        //this.props.findingLocation();
      }
      */
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
          renderTabBar={() => <TabBar />}
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
