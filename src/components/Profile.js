import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const ImagePicker = require('react-native-image-picker');

var avatarOptions = {
  title: 'choose a photo',
};

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  _editAvatar() {
    ImagePicker.launchImageLibrary(avatarOptions, (response)  => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require('../assets/images/me_avatar.jpg')}
          >
            <TouchableOpacity
              style={styles.editAvatarContainer}
              onPress={() => this._editAvatar() }
            >
              <Text style={styles.editAvatar}> Edit </Text>
            </TouchableOpacity>
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
