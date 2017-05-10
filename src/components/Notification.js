import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

class Notification extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const notification = this.props.notification.attributes;
    const user = notification.user.data.attributes;
    const initiator = notification.initiator.data.attributes

    return(
      <View style={styles.row}>
        <View style={styles.avatarContainer}>
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={styles.unreadIndicator}></View>
            <Image
              style={styles.avatar}
              source={
                initiator.avatar.url != null ?
                {uri: initiator.avatar.url} :
                require('../assets/images/default_avatar.jpeg')
              }
            />
          </View>
        </View>
        <View style={styles.notificationContainer}>
          <Text style={styles.username}>{initiator.username}</Text>
          <Text style={styles.notification}>{notification.body}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: 54,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .95)',
    borderBottomColor: '#E1E1E1',
    borderBottomWidth: 1
  },

  avatarContainer: {
    flexDirection: 'row',
    width: 45,
    marginLeft: 10
  },

  avatar: {
    width: 30,
    height: 30,
    borderColor: 'rgba(56, 55, 61, .20)',
    borderWidth: 1,
    borderRadius: 15
  },

  notificationContainer: {
    flex: 1
  },

  notification: {
    fontSize: 12,
    fontFamily: 'MaisonNeueTRIAL-Medium',
    color: '#A3A3A5',
    marginTop: 3
  },

  username: {
    fontSize: 12,
    color: '#2F2F30',
    fontFamily: 'MaisonNeueTRIAL-Bold'
  },

  unreadIndicator: {
    marginTop: 10,
    marginRight: -5,
    zIndex: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FC5947'
  }

});

export default Notification;
