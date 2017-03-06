import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux'

import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Image,
  Keyboard,
  Dimensions
} from 'react-native';

import ShareOptions from '../components/ShareOptions';

const dismissKeyboard = require('dismissKeyboard')

class ShareForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: null,
      disabled: true,
      keyboardShown: false,
      heightWithoutKeyboard: Dimensions.get('window').height,
      heightWithKeyboard: null
    }
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow (e) {
    let newSize = Dimensions.get('window').height - e.endCoordinates.height
    this.setState({
      keyboardShown: true,
      heightWithKeyboard: newSize
    })
  }

  _keyboardDidHide (e) {
    this.setState({
      keyboardShown: false,
      heightWithKeyboard: null
    })
  }

  _goBack() {
    dismissKeyboard();
    Actions.pop()
  }

  _publishPost() {
    locationId = this.props.location.data.data.id;
    this.props.createPost(locationId, this.state.text);
    this._goBack();
  }

  _onInputChange(text) {
    if (text.length > 0) {
      this.setState({text: text, disabled: false})
    } else {
      this.setState({text: text, disabled: true})
    }
  }

  render() {
    let disabled = this.state.disabled;
    console.log(this.state)

    return(
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <View>
            <TouchableHighlight
              style={styles.cancelButton}
              onPress={() => this._goBack()}
            >
              <Text style={styles.enabledHeaderText}> Cancel </Text>
            </TouchableHighlight>
          </View>

          <View>
            <Text style={styles.headerTextBold}> New Post </Text>
          </View>

          <View>
            <TouchableHighlight
              style={styles.submitButton}
              disabled={disabled}
              onPress={() => this._publishPost()}
            >
              <Text style={(disabled === true) ? styles.disabledHeaderText : styles.enabledHeaderText}> Post </Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.avatarHeaderContainer}>
          <View style={styles.avatarHeader}>
            <Image
              style={styles.avatar}
              source={require('../assets/images/me_avatar.jpg')}
            />
            <Text style={styles.username}> jmtibs </Text>
          </View>
        </View>

        <TextInput
          autoFocus={true}
          ref='textInput'
          style={styles.input}
          multiline={true}
          maxLength={300}
          placeholder="Drop some knowledge, share a review, or just post a funny comment…"
          onChangeText={(text) => this._onInputChange(text)}
        />

        <ShareOptions
          visible={this.state.keyboardShown}
          heights={[this.state.heightWithoutKeyboard, this.state.heightWithKeyboard]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#343442"
  },

  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 65,
    paddingTop: 8,
  },

  avatarHeaderContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  avatarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 20
  },

  avatar: {
    width: 30,
    height: 30,
    borderColor: 'rgba(56, 55, 61, .20)',
    borderWidth: 1,
    borderRadius: 15,
  },

  username: {
    color: "#343442",
    fontSize: 12,
    fontFamily: 'MaisonNeueTRIAL-Bold',
    marginLeft: 8
  },

  enabledHeaderText: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'MaisonNeueTRIAL-Medium',
  },

  disabledHeaderText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.4)',
    fontFamily: 'MaisonNeueTRIAL-Medium'
  },

  headerTextBold: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'MaisonNeueTRIAL-Bold'
  },

  cancelButton: {
    marginLeft: 10,
  },

  submitButton: {
    marginRight: 10
  },

  input: {
    flex: 1,
    backgroundColor: 'white',
    fontSize: 15,
    lineHeight: 11,
    fontFamily: 'MaisonNeueTRIAL-Book',
    color: "#CECED1",
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20
  }
})

export default ShareForm
