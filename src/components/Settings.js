import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux'

import {
  View,
  ListView,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class Settings extends Component {
  constructor(props) {
    super(props)
  }

  _goBack() {
    Actions.pop();
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.backButton}
              onPress={() => this._goBack()}
            >
              <Icon name='ios-arrow-back' style={styles.backIcon} size={18}></Icon>
            </TouchableHighlight>
          </View>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTextBold}> Settings </Text>
          </View>

          <View style={styles.emptyContainer}></View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F7'
  },

  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#343442',
    height: 65,
    paddingTop: 8,
  },

  headerTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  headerTextBold: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'MaisonNeueTRIAL-Demi'
  },

  backButton: {
    marginLeft: 16,
    marginTop: 5
  },

  backIcon: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'MaisonNeueTRIAL-Medium'
  }

})

export default Settings;
