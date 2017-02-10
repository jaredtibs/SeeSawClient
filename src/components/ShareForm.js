import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux'

import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

const dismissKeyboard = require('dismissKeyboard')

class ShareForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: null,
      disabled: true
    }
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
            <Text style={styles.headerTextBold}> Share </Text>
          </View>

          <View>
            <TouchableHighlight
              style={styles.submitButton}
              disabled={disabled}
              onPress={() => this._publishPost()}
            >
              <Text style={(disabled === true) ? styles.disabledHeaderText : styles.enabledHeaderText}> Send </Text>
            </TouchableHighlight>
          </View>
        </View>

        <TextInput
          autoFocus={true}
          ref='textInput'
          style={styles.input}
          multiline={true}
          maxLength={300}
          placeholder=" what's the scoop?"
          onChangeText={(text) => this._onInputChange(text)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F4'
  },

  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    height: 35,
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },

  enabledHeaderText: {
    fontSize: 18,
    color: '#302F30',
    fontFamily: 'Calibre-Regular',
  },

  disabledHeaderText: {
    fontSize: 18,
    color: 'rgba(48, 47, 48, 0.3)',
    fontFamily: 'Calibre-Regular',
  },

  headerTextBold: {
    fontSize: 18,
    color: '#302F30',
    fontFamily: 'Calibre-Semibold',
  },

  cancelButton: {
    marginLeft: 10,
  },

  submitButton: {
    marginRight: 10
  },

  input: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    fontSize: 16,
    fontFamily: 'Calibre-Regular',
    color: "#848388"
  }
})

export default ShareForm
