import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux'

import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  ListView,
  ScrollView,
  Image,
  StatusBar
} from 'react-native';

import FeedContainer from '../containers/FeedContainer';
import ShareFormContainer from '../containers/ShareFormContainer';
import Icon from 'react-native-vector-icons/Ionicons';

class Location extends Component {
  constructor(props) {
    super(props)
  }

  renderStats(location) {
    locationName = location.data.data.attributes.name;
    locationCity = "Los Angeles, CA"
    postCount = this.props.feed.postCount

    return(
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statValue}> {postCount} </Text>
          <Text style={styles.statText}> posts </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}> 00 </Text>
          <Text style={styles.statText}> votes </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}> 00 </Text>
          <Text style={styles.statText}> photos </Text>
        </View>
      </View>
    )
  }

  renderFeed() {
    const {dispatch, location} = this.props

    return (
      <FeedContainer
        dispatch={dispatch}
        location={location}
      />
    )
  }

  _publishPost(text) {
    locationId = this.props.location.data.data.id;
    this.props.createPost(locationId, text);
    this.refs.textInput.setNativeProps({text: ''})
  }

  _openInputForm() {
    Actions.shareForm();
  }

  render() {
    const location = this.props.location
    const isFetching = this.props.location.findingLocation

    return(
      <View style={styles.container}>
       <StatusBar
        barStyle="light-content"
        />
        <ScrollView bounces={false} automaticallyAdjustContentInsets={false}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require('../assets/images/bungalow.jpg')}
            />
          </View>
          { !isFetching ? this.renderStats(location) : null}
          { !isFetching ? this.renderFeed() : null}
        </ScrollView>

        <View style={styles.input}>
          <TouchableHighlight
            onPress={() => this._openInputForm()}
            underlayColor='#FFFFFF'
            style={styles.inputButton}>

            <Text style={styles.inputTextContainer}>
              <Icon name='md-add' size={18} style={styles.plusIcon}></Icon>

              <Text style={styles.inputText}> Share a thought... </Text>
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.cameraButton}>
            <Icon name='ios-camera-outline' size={20} style={styles.cameraIcon}></Icon>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    flex: 1,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
    backgroundColor: '#FAF8F7',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(52,52,66,.10)'
  },

  stat: {
    padding: 30
  },

  /* other way of formatting stats by using these styles on each view
   * and removing above style
  postStat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  votesStat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  photoStat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  */

  statText: {
    fontSize: 10,
    fontFamily: 'MaisonNeueTRIAL-Bold',
    color: 'rgba(52,52,66,.50)',
    marginTop: 3,
    textAlign: 'center'
  },

  statValue: {
    fontSize: 18,
    fontFamily: 'MaisonNeueTRIAL-Bold',
    textAlign: 'center'
  },

  locationName: {
    fontSize: 34,
    color: '#302F30',
    fontFamily: 'Calibre-Semibold'
  },

  city: {
    fontSize: 16,
    color: '#848388',
    fontFamily: 'Calibre-Regular'
  },

  input: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 55,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(56, 55, 61, 0.2)',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowColor: 'rgba(25, 24, 26, 0.19)',
    shadowOpacity: 1.0,
    padding: 10
  },

  inputButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },

  inputTextContainer: {
    padding: 5
  },

  inputText: {
    fontSize: 14,
    fontFamily: 'MaisonNeueTRIAL-Medium',
    color: 'rgba(0,0,0,.30)',
  },

  plusIcon: {
    color: '#343442'
  },

  cameraButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  cameraIcon: {
    color: '#343442'
  }

})

export default Location;
