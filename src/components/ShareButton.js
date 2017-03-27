import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux'

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
const ImagePicker = require('react-native-image-picker');

var cameraOptions = {
  cameraType: 'front'
};

class ShareButton extends Component {
  constructor(props) {
    super(props)
  }

  _openInputForm() {
    Actions.shareForm();
  }

  _openCamera() {
    ImagePicker.launchCamera(cameraOptions, (response)  => {
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
        let data = { file: response.data };
        //this.props.publishPhotoPost(data)
        console.log(data);
      }
    });
  }

  render() {
    return(
      <View style={styles.shareButton}>
        <TouchableHighlight
          onPress={() => this._openInputForm()}
          underlayColor='#FFFFFF'
          style={styles.textInputButton}>

          <View style={styles.inputText}>
            <Icon name='md-add' size={18} style={styles.plusIcon}></Icon>
            <Text style={styles.placeholder}>
              Share a thought...
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.cameraButton}
          onPress={() => this._openCamera()}
          underlayColor='#FFFFFF'>
          <Icon name='ios-camera-outline' size={25} style={styles.cameraIcon}></Icon>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 55,
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(56, 55, 61, 0.2)',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowColor: 'rgba(0,0,0,0.26)',
    shadowOpacity: 0.5,
    padding: 10
  },

  textInputButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },

  inputText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  placeholder: {
    fontSize: 14,
    fontFamily: 'MaisonNeueTRIAL-Medium',
    color: 'rgba(0,0,0,.30)',
    paddingLeft: 15
  },

  plusIcon: {
    color: '#343442',
    paddingLeft: 10
  },

  cameraButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  cameraIcon: {
    color: '#343442',
    paddingRight: 5
  }

});

export default ShareButton;
