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

import CustomTabBar from '../components/CustomTabBar';
import LocationContainer from '../containers/LocationContainer';
import ProfileContainer from '../containers/ProfileContainer';
import NotificationsContainer from '../containers/NotificationsContainer';

// Factual Engine **
const Engine = NativeModules.Engine;

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      appState: AppState.currentState
    }
  }

  componentDidMount() {
    //AppState.addEventListener('change', this._handleAppStateChange);
    this._getUserLocation();
  }

  componentWillUnmount() {
    //AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange (nextAppState) {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this._getUserLocation();
    }
    this.setState({appState: nextAppState});
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
        <CustomTabBar
          location={this.props.location}
          user={this.props.user}
          changeTabScene={this._changeTabScene}
        />
        <ScrollView contentContainerStyle={styles.mainScrollView}>
          {fetchingLocation ?
            this.renderLocationLoadingState() :
            this.renderLocation()
          }
        </ScrollView>
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
