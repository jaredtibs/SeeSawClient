import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require('../assets/images/me_avatar.jpg')}
          >
            <View style={styles.editAvatarContainer}>
              <Text style={styles.editAvatar}> Edit </Text>
            </View>
          </Image>
          <Text style={styles.username}> jmtibs </Text>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            onPress={() => this.props.logout()}
          >
            <Text> Logout </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  optionsContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'rgba(56, 55, 61, .20)',
    borderWidth: 1,
    justifyContent: 'flex-end'
  },

  editAvatarContainer: {
    backgroundColor: 'rgba(179, 178, 182, 0.5)'
  },

  editAvatar: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'MaisonNeueTRIAL-Demi',
    fontSize: 12,
  },

  username: {
    color: '#848388',
    fontSize: 20,
    fontFamily: 'MaisonNeueTRIAL-Demi',
    marginTop: 10
  }
});

export default Profile;
