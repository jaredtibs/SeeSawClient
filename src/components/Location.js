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
  StatusBar,
  Animated
} from 'react-native';

import FeedContainer from '../containers/FeedContainer';
import ShareFormContainer from '../containers/ShareFormContainer';
import Icon from 'react-native-vector-icons/Ionicons';

class Location extends Component {
  constructor(props) {
    super(props)
  }

  renderStats(location) {
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


  handleScroll(event: Object) {
    let scrollPosition = event.nativeEvent.contentOffset.y;
    this.props.scrolledLocation(scrollPosition);
  }

  render() {
    const location = this.props.location
    const isFetching = this.props.location.findingLocation
    const locationName = location.data.data.attributes.name;
    //TODO swap with api value
    const locationCity = "Los Angeles, CA"

    //on ScrollView
    //bounces={false}
    //not sure if this prop below is having any effect
    //automaticallyAdjustContentInsets={false}
    return(
      <View style={styles.container}>
       <StatusBar
        barStyle="light-content"
        />
        <ScrollView
          scrollEventThrottle={16}
          onScroll={this.handleScroll.bind(this)}
        >
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../assets/images/bungalow.jpg')}
            >
              <View style={styles.locationHeader}>
                <Text style={styles.locationName}> {locationName} </Text>
                <Text style={styles.locationCity}> {locationCity} </Text>
              </View>
            </Image>
          </View>
          { !isFetching ? this.renderStats(location) : null}
          { !isFetching ? this.renderFeed() : null}
        </ScrollView>

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
            style={styles.cameraButton}>
            <Icon name='ios-camera-outline' size={25} style={styles.cameraIcon}></Icon>
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
    width: undefined,
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
    height: 280,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  locationHeader: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginBottom: 20
  },

  locationName: {
    fontFamily: 'MaisonNeueTRIAL-Bold',
    color: '#FAF8F7',
    fontSize: 24,
    textAlign: 'center',
  },

  locationCity: {
    fontFamily: 'MaisonNeueTRIAL-Demi',
    color: 'rgba(255,255,255,.80)',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8
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

  statText: {
    fontSize: 10,
    fontFamily: 'MaisonNeueTRIAL-Bold',
    color: 'rgba(52,52,66,.50)',
    marginTop: 3,
    textAlign: 'center'
  },

  statValue: {
    fontSize: 18,
    fontFamily: 'GTPressuraMonoTrial-Bold',
  },

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

})

export default Location;
