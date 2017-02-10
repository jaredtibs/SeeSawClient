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
    return <View style={[styles.tabs, this.props.style, ]}>
      {this.props.tabs.map((tab, i) => {
        return(
          <View key={tab}>
            <TouchableOpacity onPress={() => this.props.goToPage(i)} style={styles.tab}>
              {(() => {
                if (tab == 'location') {
                  return (
                    <View style={styles.locationTabContainer}>
                      <Text style={styles.textTab}> 
                        LOCATION
                      </Text>
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
    paddingBottom: 10,
  },
  tabs: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },

  locationTabContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  textTab: {
    fontSize: 12,
    color: '#302F30',
    fontFamily: 'Calibre-Semibold',
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
