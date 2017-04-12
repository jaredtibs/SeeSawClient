import React from 'react';
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

const TabBar = React.createClass({
  tabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  },

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  //promising animation ease values:
  // 'linear'
  // 'ease-in-sine'
  // 'ease-in-cubic'
  componentDidUpdate() {
    if (this.props.location.scrolledLocationNav) {
      this.refs.locationHeader.transitionTo({marginBottom:0, paddingBottom: 10, fontSize: 18}, 200, 'ease-in-sine')
    }
  },

  setAnimationValue({ value, }) {
    this.tabIcons.forEach((icon, i) => {
      const progress = Math.min(1, Math.abs(value - i))
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  },

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  },

  renderStatusBar() {
    const { location, activeTab } = this.props;
    if (activeTab == 0 || activeTab == 2 || location.scrolledLocationNav) {
      return(
        <StatusBar
          barStyle="default"
        />
      )
    } else {
      return(
        <StatusBar
          barStyle="light-content"
        />
      )
    }
  },

  render() {
    const { location, activeTab } = this.props;
    const locationData = location.data;
    const userAvatar = this.props.user.avatar;
    const scrolledTabBar = location.scrolledLocationNav && activeTab == 1;
    const lightTabBar = activeTab == 0 || activeTab == 2 || scrolledTabBar;

    return(
      <View style={lightTabBar ? [styles.scrolledLocationNav, this.props.style, ] : [styles.tabs, this.props.style, ]}>
        {this.renderStatusBar()}
        {this.props.tabs.map((tab, i) => {
          return(
            <View key={tab}>
              <TouchableOpacity onPress={() => this.props.goToPage(i)} style={styles.tab}>
                {(() => {
                  if (tab == 'location') {
                    return (
                      <View style={styles.locationTabContainer}>
                        { lightTabBar ?
                          <Animatable.Text ref="locationHeader" style={(activeTab == 0 || activeTab == 2) ? styles.lightTextTab : styles.scrolledTextTab}>
                            { locationData ? locationData.data.attributes.name : null }
                          </Animatable.Text>
                          :
                          <Text style={styles.textTab}>current location</Text>
                        }
                        {!lightTabBar ?
                          <TouchableOpacity
                            onPress={() => console.log("dispatch editing location action")}>
                            <Icon name='ios-arrow-down-outline'
                                  size={18}
                                  style={styles.moreLocationIcon}
                            />
                          </TouchableOpacity>
                        : null}
                      </View>
                    )
                  } else if (tab == 'profile') {
                    return(
                      <Image
                        name={tab}
                        color={this.props.activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}
                        style={styles.avatar}
                        source={
                          userAvatar != null ?
                          {uri: userAvatar} :
                          require('../assets/images/default_avatar.jpeg')}
                      />
                    )
                  } else {
                    return(
                      <View
                        name={tab}
                        style={lightTabBar ? styles.notificationsActive : styles.notifications}
                        size={30}
                        color={this.props.activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}
                        ref={(icon) => { this.tabIcons[i] = icon; }}
                      >
                        {
                          lightTabBar ? 
                          <Text style={styles.notificationCount}> 2 </Text>
                          : <Icon name='ios-notifications-outline' size={18} style={styles.notificationIcon} />
                        }
                      </View>
                    )
                  }
                })()}
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    )
  },
});

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
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: 'rgba(9, 9, 12, .80)'
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

export default TabBar;
