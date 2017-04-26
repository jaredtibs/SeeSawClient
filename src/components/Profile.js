import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux'

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

const ImagePicker = require('react-native-image-picker');

import HeaderBar from '../components/HeaderBar';

var avatarOptions = {
  title: '',
  allowsEditing: true,
  mediaType: 'photo'
};

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  _editAvatar() {
    ImagePicker.showImagePicker(avatarOptions, (response)  => {
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
        let data = { file: response.data };
        this.props.updateAvatar(data)
      }
    });
  }

  _openSettings() {
    Actions.settings();
  }

  renderSpinner() {
    return(
      <ActivityIndicator
        animating={this.props.user.loading}
        style={{height: 20, marginBottom: 25}}
        color="white"
        size="small"
      />
    )
  }

  render() {
    const { user } = this.props;

    return(
      <View style={styles.container}>
        <HeaderBar
          goBack={() => Actions.pop()}
          header="Profile"
        />
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={
              this.props.user.avatar != null ?
              {uri: user.avatar} :
              require('../assets/images/default_avatar.jpeg')}
          >
            { this.props.user.loading ? this.renderSpinner() : null }
            <TouchableOpacity
              style={styles.editAvatarContainer}
              onPress={() => this._editAvatar() }
            >
              <Text style={styles.editAvatar}> Edit </Text>
            </TouchableOpacity>
          </Image>
          <Text style={styles.username}> {user.username} </Text>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={() => this.props.logout()}>
            <Text> Logout </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._openSettings()}>
            <Text> Settings </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },

});

export default Profile;
