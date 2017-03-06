import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

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

  render() {
    const { location, activeTab } = this.props
    const locationData = location.data;
    const lightTabBar = location.scrolledLocationNav || activeTab == 0 || activeTab == 2

    return <View style={lightTabBar ? [styles.scrolledLocationNav, this.props.style, ] : [styles.tabs, this.props.style, ]}>
      {this.props.tabs.map((tab, i) => {
        return(
          <View key={tab}>
            <TouchableOpacity onPress={() => this.props.goToPage(i)} style={styles.tab}>
              {(() => {
                if (tab == 'location') {
                  return (
                    <View style={styles.locationTabContainer}>
                      <Text style={lightTabBar ? styles.scrolledTextTab : styles.textTab}>
                        { (lightTabBar && locationData) ? locationData.data.attributes.name : "current location" }
                      </Text>
                       {!lightTabBar ?
                        <Icon name='ios-arrow-down-outline'
                              size={18}
                              style={styles.moreLocationIcon}
                        />
                      : null}
                    </View>
                  )
                } else if (tab == 'profile') {
                  return(
                    <Image
                      name={tab}
                      color={this.props.activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}
                      style={styles.avatar}
                      source={require('../assets/images/me_avatar.jpg')}
                    />
                  )
                } else {
                  return(
                    <View
                      name={tab}
                      style={styles.notifications}
                      size={30}
                      color={this.props.activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}
                      ref={(icon) => { this.tabIcons[i] = icon; }}
                    >
                      <Text style={styles.notificationCount}> 0 </Text>
                    </View>
                  )
                }
              })()}
            </TouchableOpacity>
          </View>
        )
      })}
    </View>;
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

  scrolledTextTab: {
    fontSize: 18,
    color: '#343442',
    paddingBottom: 10,
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
    backgroundColor: 'rgba(179, 178, 182, 0.3)',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },

  notificationCount: {
    color: 'white',
    fontSize: 16,
  }

});

export default TabBar;
