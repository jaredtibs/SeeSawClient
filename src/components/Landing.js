import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import RegisterContainer from '../containers/RegisterContainer';

import Icon from 'react-native-vector-icons/Ionicons';

class Landing extends Component {
  constructor(props) {
    super(props)
  }

  _goToRegister() {
    Actions.register();
  }

  _goToLogin() {
    Actions.login();
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.dotsContainer}>
            <View style={styles.dotOneInnerContainer}>
              <View style={styles.dot}></View>
            </View>

            <View style={styles.dotTwoInnerContainer}>
              <View style={styles.dot}></View>
            </View>
          </View>
          <Text style={styles.headerText}> seesaw </Text>
          <Text style={styles.subText}> Leave and retrieve digital notes {"\n"} wherever you go </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this._goToRegister()}
          >
            <Text style={styles.buttonText}> SIGN UP </Text>
            <Icon name='ios-arrow-round-forward-outline' size={22}></Icon>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this._goToLogin()}
          >
            <Text style={styles.buttonSubText}> I already have an account </Text>
          </TouchableOpacity>
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

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },

  dotOneInnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 12
  },

  dotTwoInnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 12
  },

  dot: {
    backgroundColor: "#331238",
    height: 10,
    width: 10,
    borderRadius: 50
  },

  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 50
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    flexDirection: 'row',
    width: 160,
    height: 40,
    backgroundColor: '#23EC69',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    color: "#320D3A",
    fontSize: 16,
    fontFamily: 'MaisonNeueTRIAL-Bold'
  },

  headerText: {
    textAlign: 'center',
    fontSize: 40,
    color: '#320D3A',
    fontFamily: 'MaisonNeueTRIAL-Bold',
    marginTop: 20,
  },

  subText: {
    fontSize: 14,
    fontFamily: 'MaisonNeueTRIAL-Medium',
    textAlign: 'center',
    marginTop: 20,
    color: 'rgba(50, 13, 58, .60)'
  },

  buttonSubText: {
    marginTop: 30,
    fontSize: 12,
    fontFamily: 'MaisonNeueTRIAL-Medium',
    color: '#320D3A'
  }
});

export default Landing;
