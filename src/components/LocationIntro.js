import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

class LocationIntro extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Your Location
          </Text>
          <Text style={styles.bodyText}>
            SeeSaw is powered by your location. By giving us access, you are allowing us to deliver you the best possible content and experience.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('clicked!')}
          >
            <Text style={styles.buttonText}> GOT IT </Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F7'
  },

  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  headerText: {
    fontFamily: 'MaisonNeueTRIAL-Bold',
    fontSize: 20,
    color: '#320D3A'
  },

  bodyText: {
    fontSize: 12,
    fontFamily: 'MaisonNeueTRIAL-Medium',
    color: 'rgba(50, 13, 58, .60)',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 50,
    padding: 10
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
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
  }

});

export default LocationIntro;
