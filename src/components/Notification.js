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
    return(
      <View style={styles.row}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require('../assets/images/default_avatar.jpeg')}
          />
        </View>
        <View style={styles.notificationContainer}>
          <Text style={styles.username}> jmtibs </Text>
          <Text style={styles.notification}> {this.props.notification} </Text>
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
  }

});

export default Notification;
