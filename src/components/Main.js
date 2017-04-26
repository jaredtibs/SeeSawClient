import React, { Component } from 'react';

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

//import TabBar from '../components/TabBar';
import CustomTabBar from '../components/CustomTabBar';
import LocationContainer from '../containers/LocationContainer';
import ProfileContainer from '../containers/ProfileContainer';

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

  renderProfile() {
    const { dispatch } = this.props;

    return (
      <ProfileContainer dispatch={dispatch} />
    )
  }

  renderLocation () {
    const {dispatch } = this.props;

    return (
      <LocationContainer dispatch={dispatch} />
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
      /*
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
      */
      <View style={styles.container}>
        <CustomTabBar location={this.props.location} user={this.props.user} />
        <ScrollView>
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
