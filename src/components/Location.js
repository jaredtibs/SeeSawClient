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
  RefreshControl
} from 'react-native';

import ShareButton from '../components/ShareButton';
import FeedContainer from '../containers/FeedContainer';
import EditLocationContainer from '../containers/EditLocationContainer';
import Icon from 'react-native-vector-icons/Ionicons';
import ParallaxView from 'react-native-parallax-view';

class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrolledDown: false
    }
  }

  renderStats(location) {
    const attributes = location.data.data.attributes;
    const postCount = attributes['post-count']
    const voteCount = attributes['vote-count']
    const photoCount = attributes['photo-count']

    return(
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statValue}> {location.newPostCount ? location.newPostCount : postCount} </Text>
          <Text style={styles.statText}> posts </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}> {location.newVoteCount ? location.newVoteCount : voteCount} </Text>
          <Text style={styles.statText}> votes </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}> {location.newPhotoCount ? location.newPhotoCount : photoCount} </Text>
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

  renderEditLocationMenu() {
    return(
      <EditLocationContainer />
    )
  }

  render() {
    const location = this.props.location
    const isFetching = this.props.location.findingLocation
    const isRefreshing = isFetching && this.props.feed.posts.length > 0
    const { name, city, region } = location.data.data.attributes;

    return(
      <View style={styles.container}>

        {location.editingLocation ?
          this.renderEditLocationMenu() :
          null
        }

        <ParallaxView
          backgroundSource={require('../assets/images/bungalow.jpg')}
          windowHeight={280}
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
            <View style={styles.locationHeader}>
              <Text style={styles.locationName}> {name} </Text>
              <Text style={styles.locationCity}> {city}, {region} </Text>
            </View>
          )}>
            { !isFetching ? this.renderStats(location) : null}
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

  locationHeader: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    fontFamily: 'GTPressuraMonoTrial-Bold'
  }

});

export default Location;
