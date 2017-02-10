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
  }

  async _getUserLocation() {
    try {
      const locations = await Engine.getCurrentLocations();

      if (locations["candidates"] && locations["candidates"].length > 0) {
        const bestCandidate = locations["candidates"][0];
        this.props.fetchCurrentLocation(bestCandidate);
      } else {
        // you might not need this extra request, it might be needed because simulator 
        // does not recognize new location on first load, need to test on iphone
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
          navigator={navigator}
          tabLabel="location"/>
      </View>
    )
  }

  renderLocationLoadingState() {
    return(
      <View style={styles.locationLoadingState}
            tabLabel="location">
        <Text style={styles.loadingText}> Finding your location... </Text>
      </View>
    )
  }

  render() {
    const fetchingLocation = this.props.location.findingLocation
    //console.log(this.props);

    return(
      <View style={styles.container}>
        <ScrollableTabView
          style={{marginTop: 20}}
          initialPage={1}
          renderTabBar={() => <TabBar />}>

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
