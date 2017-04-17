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
              underlayColor='#343442'
            >
              <Icon name='ios-arrow-back' style={styles.backIcon} size={18}></Icon>
            </TouchableHighlight>
          </View>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTextBold}> Settings </Text>
          </View>

          <View style={styles.emptyContainer}></View>
        </View>

        <View style={styles.settingsSection}>
          <View style={styles.settingsSectionHeader}>
            <Text style={styles.settingsHeaderText}> Invite </Text>
          </View>
          <View style={styles.settingsButtonContainer}>
            <Text style={styles.settingsButtonText}> Option 1 </Text>
          </View>
          <View style={styles.settingsButtonContainer}>
            <Text style={styles.settingsButtonText}> Option 2</Text>
          </View>
        </View>

        <View style={styles.settingsSection}>
          <View style={styles.settingsSectionHeader}>
            <Text style={styles.settingsHeaderText}> My Account </Text>
          </View>
          <View style={styles.settingsButtonContainer}>
            <Text style={styles.settingsButtonText}> Option 1 </Text>
          </View>
          <View style={styles.settingsButtonContainer}>
            <Text style={styles.settingsButtonText}> Option 2</Text>
          </View>
        </View>

        <View style={styles.settingsSection}>
          <View style={styles.settingsSectionHeader}>
            <Text style={styles.settingsHeaderText}> Settings </Text>
          </View>
          <View style={styles.settingsButtonContainer}>
            <Text style={styles.settingsButtonText}> Option 1 </Text>
          </View>
          <View style={styles.settingsButtonContainer}>
            <Text style={styles.settingsButtonText}> Option 2</Text>
          </View>
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
  },

  settingsSection: {
    flex: 1
  },

  settingsSectionHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  settingsHeaderText: {
    fontSize: 12,
    fontFamily: 'MaisonNeueTRIAL-Bold',
    color: '#9B9B9B'
  },

  settingsButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50
  },

  settingsButtonText: {
    fontSize: 14,
    fontFamily: 'MaisonNeueTRIAL-Medium',
    color: '#343442'
  }

})

export default Settings;
