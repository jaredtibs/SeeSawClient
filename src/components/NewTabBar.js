import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';

class NewTabBar extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  }

  //promising animation ease values:
  // 'linear'
  // 'ease-in-sine'
  // 'ease-in-cubic'
  componentDidUpdate() {
    //if (this.props.location.scrolledLocationNav) {
    // this.refs.locationHeader.transitionTo({marginBottom:0, paddingBottom: 10, fontSize: 18}, 200, 'ease-in-sine')
    //}
  }

  renderStatusBar() {
    //const { location, activeTab } = this.props;
    //if (activeTab == 0 || activeTab == 2 || location.scrolledLocationNav) {
    // return(
    //   <StatusBar
    //     barStyle="default"
    //   />
    // )
    //} else {
    return(
      <StatusBar
        barStyle="default"
      />
    )
  }

  render() {
    // const { location, activeTab } = this.props;
    //const locationData = location.data;
    // const userAvatar = this.props.user.avatar;
    //const scrolledTabBar = location.scrolledLocationNav && activeTab == 1;
    //const lightTabBar = activeTab == 0 || activeTab == 2 || scrolledTabBar;

    return(
      <View style={[styles.tabBar, this.props.style]}>
        {this.renderStatusBar()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabBar: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: 'rgba(9, 9, 12, .80)'
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrolledLocationNav: {
    height: 65,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAF8F7',
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8'
  },

  locationTabContainer: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  moreLocationIcon: {
    color: '#FAF8F7',
  },

  lightTextTab: {
    fontSize: 18,
    color: '#343442',
    paddingBottom: 10,
    fontFamily: 'MaisonNeueTRIAL-Bold'
  },

  scrolledTextTab: {
    fontSize: 2,
    color: '#343442',
    marginBottom: -35,
    fontFamily: 'MaisonNeueTRIAL-Bold'
  },

  textTab: {
    fontSize: 10,
    color: '#FAF8F7',
    fontFamily: 'MaisonNeueTRIAL-Bold'
  },

  avatar: {
    width: 30,
    height: 30,
    borderColor: 'rgba(56, 55, 61, .20)',
    borderWidth: 1,
    borderRadius: 15,
    marginLeft: 15
  },

  notifications: {
    width: 30,
    height: 30,
    borderRadius: 30/2,
    backgroundColor: '#09090C',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },

  notificationsActive: {
    width: 30,
    height: 30,
    borderRadius: 30/2,
    backgroundColor: '#F76148',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },

  notificationCount: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'GTPressuraMonoTrial-Bold',
    paddingBottom: 1
  },

  notificationIcon: {
    color: 'white'
  }

});

export default NewTabBar;
