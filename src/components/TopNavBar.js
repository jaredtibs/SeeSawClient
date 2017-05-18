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
import ModalPicker from 'react-native-modal-picker';

class TopNavBar extends Component {
  constructor(props) {
    super(props)
  }

  //promising animation ease values:
  // 'linear'
  // 'ease-in-sine'
  // 'ease-in-cubic'
  componentDidUpdate() {
    if (this.props.location.scrolledLocationNav) {
      this.refs.locationHeader.transitionTo({marginBottom:0, fontSize: 18}, 250, 'linear')
    }
  }

  renderStatusBar() {
    const { location, activeTab } = this.props;
    return(
      <StatusBar barStyle="default" />
    )
  }

  render() {
    const { location, user, otherLocations, notificationCount } = this.props;
    const locationData = location.data;
    const userAvatar = user.avatar;
    const scrolledTabBar = location.scrolledLocationNav;

    return(
      <View style={scrolledTabBar ? styles.scrolledTabs : styles.tabs}>
        {this.renderStatusBar()}

        <View>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => this.props.changeTabScene('profile')}>
            <Image
              style={styles.avatar}
              source={
                userAvatar != null ?
                {uri: userAvatar} :
                require('../assets/images/default_avatar.jpeg')}
            />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => console.log('editing location')}>
            <View style={styles.locationTabContainer}>
              { scrolledTabBar ?
                <Animatable.Text ref="locationHeader" style={styles.scrolledTextTab}>
                  { locationData ? locationData.data.attributes.name : null }
                </Animatable.Text>
                :
                <ModalPicker
                  data={otherLocations}
                  onChange={(option)=>{ this.props.changeLocation(option) }}
                  sectionTextStyle={styles.editLocationHeader}
                  optionStyle={{padding: 10}}
                  optionTextStyle={styles.editLocationOption}
                  cancelTextStyle={styles.editLocationCancel}>
                  <Text style={styles.textTab}>current location</Text>
                </ModalPicker>
              }
              { !scrolledTabBar ?
                <ModalPicker
                  data={otherLocations}
                  onChange={(option)=>{ this.props.changeLocation(option) }}
                  sectionTextStyle={styles.editLocationHeader}
                  optionTextStyle={styles.editLocationOption}
                  cancelTextStyle={styles.editLocationCancel}>
                  <Icon name='ios-arrow-down-outline'
                    size={18}
                    style={styles.moreLocationIcon}
                  />
                </ModalPicker>
                :
                null
              }
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => this.props.changeTabScene('location')}>
            <View style={styles.notifications}>
              {
                scrolledTabBar ?
                <Text style={styles.notificationCount}> { notificationCount } </Text>
                : <Icon name='ios-notifications-outline' size={18} style={styles.notificationIcon} />
                }
            </View>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabs: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#F1F1F1'
  },

  scrolledTabs: {
    height: 65,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F1F1'
  },

  locationTabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  moreLocationIcon: {
    marginTop: 3,
    color: '#303035'
  },

  scrolledTextTab: {
    fontSize: 0,
    color: '#343442',
    marginBottom: -35,
    fontFamily: 'MaisonNeueTRIAL-Bold'
  },

  textTab: {
    fontSize: 14,
    color: '#303035',
    fontFamily: 'MaisonNeueTRIAL-Bold',
    marginRight: 5
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
    backgroundColor: 'rgba(47, 47, 48, .10)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
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
    color: '#303035',
  },

  editLocationHeader: {
    fontSize: 18,
    color: '#303035',
    fontFamily: 'MaisonNeueTRIAL-Bold'
  },

  editLocationOption: {
    fontSize: 16,
    color: '#303035',
    fontFamily: 'MaisonNeueTRIAL-Demi'
  },

  editLocationCancel: {
    fontSize: 18,
    color: '#303035',
    fontFamily: 'MaisonNeueTRIAL-Bold'
  }

})

export default TopNavBar;
