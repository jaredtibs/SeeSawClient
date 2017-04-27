import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class HeaderBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <View style={styles.headerBar}>
          <View style={styles.backContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => this.props.goBack()}
            >
              <Icon name='ios-arrow-round-back-outline' style={styles.back} size={32}></Icon>
            </TouchableOpacity>
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.headerTextBold}> {this.props.header} </Text>
          </View>

          <View style={{flex: 1}}>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 65
  },

  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  backContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    height: 65,
    paddingTop: 10,
  },

  headerTextBold: {
    fontSize: 16,
    color: '#303035',
    fontFamily: 'MaisonNeueTRIAL-Bold',
  },

  backButton: {
    justifyContent: 'center',
  },

  back: {
    paddingLeft: 15,
    paddingTop: 8,
    color: '#2F2F30'
  }
});

export default HeaderBar
