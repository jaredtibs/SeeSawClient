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
  RefreshControl,
  Dimensions
} from 'react-native';

import ShareButton from '../components/ShareButton';
import FeedContainer from '../containers/FeedContainer';
import Icon from 'react-native-vector-icons/Ionicons';
import ParallaxView from 'react-native-parallax-view';

const width = Dimensions.get('window').width;

class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrolledDown: false
    }
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

  _onRefresh() {
    const locationId = this.props.location.data.data.id;
    const currentFeedType = this.props.feed.currentFeedType;
    this.props.fetchPosts(locationId, currentFeedType);
  }

  handleScroll(event: Object) {
    let scrollPosition = event.nativeEvent.contentOffset.y;

    if (scrollPosition >= 188 && !this.state.scrolledDown) {
      this.setState({scrolledDown: true});
      this.props.scrolledDown();
    } else if(this.state.scrolledDown && scrollPosition < 188){
      this.setState({scrolledDown: false});
      this.props.scrolledUp();
    }
  }

  render() {
    const location = this.props.location
    const isFetching = this.props.location.findingLocation
    const isRefreshing = isFetching && this.props.feed.posts.length > 0
    const { name, city, region } = location.data.data.attributes;

    const attributes = location.data.data.attributes;
    const postCount = attributes['post-count']
    const voteCount = attributes['vote-count']
    const photoCount = attributes['photo-count']

    return(
      <View style={styles.container}>
        <ParallaxView
          backgroundSource={require('../assets/images/bungalow.jpg')}
          windowHeight={225}
          scrollEventThrottle={16}
          onScroll={this.handleScroll.bind(this)}
          refreshControl={
            <RefreshControl
              tintColor="#ffffff"
              refreshing={isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          header={(
            <View style={styles.headerContainer}>
              <View style={styles.locationHeader}>
                <Text style={styles.locationName}> {name} </Text>
              </View>
              <View style={styles.locationSubHeader}>
                <View style={styles.cityContainer}>
                  <Text style={styles.locationCity}> {city}, {region} </Text>
                </View>
                <View style={styles.statsContainer}>
                  <Icon name='ios-chatbubbles-outline' size={16} style={styles.statIcon}></Icon>
                  <Text style={styles.statValue}> {location.newPostCount ? location.newPostCount : postCount} </Text>
                  <Icon name='ios-image-outline' size={16} style={styles.statIcon}></Icon>
                  <Text style={styles.statValue}> {location.newPhotoCount ? location.newPhotoCount : photoCount} </Text>
                </View>
              </View>
            </View>
          )}>
            { !isFetching ? this.renderFeed() : null}
        </ParallaxView>

        <ShareButton />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center'
  },

  locationHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },

  locationSubHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    width: width,
    backgroundColor: 'rgba(38, 38, 43, .60)',
  },

  cityContainer: {
    flex: 1,
    flexDirection: 'row'
  },

  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15
  },

  locationName: {
    fontFamily: 'MaisonNeueTRIAL-Bold',
    color: '#FAF8F7',
    fontSize: 24,
    textAlign: 'center',
  },

  locationCity: {
    fontFamily: 'MaisonNeueTRIAL-Demi',
    color: 'rgba(255,255,255,.60)',
    fontSize: 12,
    textAlign: 'center',
    marginLeft: 10
  },

  //TODO change with GTPressuerMonoTrial-Regular
  statValue: {
    fontSize: 12,
    fontFamily: 'MaisonNeueTRIAL-Demi',
    color: 'white',
    marginRight: 10,
  },

  statIcon: {
    color: '#F1F1F1',
    marginRight: 3
  }

});

export default Location;
