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
          <View>
            <TouchableHighlight
              style={styles.backButton}
              onPress={() => this._goBack()}
            >
              <Icon name='ios-arrow-back' style={styles.backIcon} size={18}></Icon>
            </TouchableHighlight>
          </View>

          <View>
            <Text style={styles.headerTextBold}> Settings </Text>
          </View>

          <View></View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#343442',
    height: 65,
    paddingTop: 8,
  },

  headerTextBold: {
    marginRight: 30,
    fontSize: 16,
    color: 'white',
    fontFamily: 'MaisonNeueTRIAL-Demi'
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
    padding: 10
  },

  backIcon: {
    marginTop: 5,
    fontSize: 20,
    color: 'white',
    fontFamily: 'MaisonNeueTRIAL-Medium'
  }

})

export default Settings;
