import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux'

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ListView,
  ScrollView,
  Image
} from 'react-native';

import FeedContainer from '../containers/FeedContainer';
import ShareFormContainer from '../containers/ShareFormContainer';
import Icon from 'react-native-vector-icons/FontAwesome';

class Location extends Component {
  constructor(props) {
    super(props)
  }

  renderLocationHeader(location) {
    locationName = location.data.data.attributes.name;
    locationCity = "Los Angeles, CA"

    postCount = this.props.feed.postCount

    return(
      <View style={styles.headerContainer}>
        <Text style={styles.locationName}>
          {locationName}
        </Text>
        <Text style={styles.city}>
          {locationCity}
        </Text>
        <View style={styles.feedMeta}>
          <Icon name='comment-o' size={16} style={styles.feedMetaIcon}></Icon>
          <Text style={styles.feedMetaText}> {postCount} </Text>
          <Icon name='picture-o' size={16} style={styles.feedMetaIcon}></Icon>
          <Text style={styles.feedMetaText}> 0 </Text>
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

  _openInputForm() {
    Actions.shareForm();
  }

  render() {
    const location = this.props.location
    const isFetching = this.props.location.findingLocation

    console.log(this.props)

    return(
      <View style={styles.container}>

        <ScrollView>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require('../assets/images/bungalow.jpg')}
            />
          </View>
          { !isFetching ? this.renderLocationHeader(location) : null}
          { !isFetching ? this.renderFeed() : null}
        </ScrollView>

        <TextInput
          ref='textInput'
          style={styles.input}
          onFocus={() => this._openInputForm()}
          placeholder='Share something fun...'
        />

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
    flexDirection: 'row',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
    flex: 1
  },

  headerContainer: {
    flex: 1,
    height: 120,
    backgroundColor: '#FAF8F7',
    paddingTop: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E9'
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

  feedMeta: {
    flexDirection: 'row',
    paddingTop: 5
  },

  feedMetaText: {
    color: '#302F30',
    fontFamily: 'Calibre-Regular',
    fontSize: 18,
    paddingRight: 10
  },

  feedMetaIcon: {
    color: '#302F30',
    marginRight: 5
  },

  input: {
    flex: 1,
    position: 'absolute',
    bottom: 15,
    left: 0,
    height: 45,
    width: 345,
    marginRight: 15,
    marginLeft: 15,
    padding: 15,
    backgroundColor: 'white',
    fontSize: 16,
    fontFamily: 'Calibre-Regular',
    color: "#848388",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(56, 55, 61, 0.2)',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowColor: 'rgba(25, 24, 26, 0.19)',
    shadowOpacity: 1.0
  }

})

export default Location;
