import React, { Component } from 'react';

import {
  View,
  ListView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import FeedCard from '../components/FeedCard';

class Feed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedFeed: null
    }
  }

  componentDidMount() {
    const location = this.props.location.data.data;
    const locationId = location.id;
    this._fetchPosts(locationId);
  }

  _fetchPosts(id) {
    this.props.fetchPosts(id, 'recent');
  }

  _toggleFeed(type) {
    this.setState({selectedFeed: type})
    locationId = this.props.location.data.data.id;
    this.props.toggleFeed(type, locationId);
  }

  _vote(postId, type) {
    this.props.castVote(postId, type)
  }

  renderEmptyState() {
    return(
      <View style={styles.emptyFeed}>
        <Text style={styles.emptyText}>
           Bummer, nothing has been shared at this location.
            I guess the power is yours. We believe in you.
        </Text>
      </View>
    )
  }

  renderRow(rowData) {
    return(
      <FeedCard postData={rowData} castVote={this._vote.bind(this)}/>
    )
  }

  renderLoadingState() {
    return(
      <View style={styles.emptyFeed}>
        <Text style={styles.emptyText}> Loading posts... </Text>
      </View>
    )
  }

  renderFeedContent() {
    let posts = this.props.feed.posts;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource = ds.cloneWithRows(posts);

    return(
      <View style={{flex: 1}}>
        {posts.length > 0 ?
          <ListView
            enableEmptySections={true}
            dataSource={dataSource}
            style={styles.feed}
            renderRow={(rowData) => this.renderRow(rowData)}>
          </ListView>
          : this.renderEmptyState()}
      </View>
    )
  }

  render() {
    const isFetching = this.props.feed.isFetching;
    let currentFeed = (this.state.selectedFeed ? this.state.selectedFeed : this.props.feed.currentFeedType);
    let hasPosts = this.props.feed.posts.length > 0

    return(
      <View style={styles.container}>
        <View style={styles.feedButtonsContainer}>
          <View style={styles.feedButtons}>
            <TouchableHighlight
              disabled={!hasPosts}
              style={ (currentFeed == 'recent' && hasPosts) ? styles.buttonActiveContainer : styles.buttonContainer }
              underlayColor='#F2F2F4'
              onPress={() => this._toggleFeed('recent')}>
              <Text style={ (currentFeed == 'recent' && hasPosts) ? styles.buttonActiveText : styles.buttonText}>
                RECENT
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              disabled={!hasPosts}
              style={ (currentFeed == 'popular' && hasPosts) ? styles.buttonActiveContainer : styles.buttonContainer }
              underlayColor='#F2F2F4'
              onPress={() => this._toggleFeed('popular')}>
              <Text style={ (currentFeed == 'popular' && hasPosts) ? styles.buttonActiveText : styles.buttonText}>
                POPULAR
              </Text>
            </TouchableHighlight>
          </View>
        </View>

        {isFetching ?
          this.renderLoadingState() :
          this.renderFeedContent()
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F7'
  },

  feed: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 60
  },

  emptyFeed: {
    flex: 1,
    height: 250,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  feedButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 10
  },

  feedButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(216,216,216,.50)',
    width: 197,
    height: 40,
    padding: 10
  },

  buttonActiveContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 95,
    height: 30,
    backgroundColor: '#FAF8F7'
  },

  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 95,
    height: 30
  },

  buttonText: {
    fontFamily: 'MaisonNeueTRIAL-Bold',
    fontSize: 12,
    color: 'rgba(52,52,66,.30)'
  },

  buttonActiveText: {
    fontFamily: 'MaisonNeueTRIAL-Bold',
    fontSize: 12,
    color: '#343442',
  },

  emptyText: {
    fontFamily: 'MaisonNeueTRIAL-Demi',
    fontSize: 12,
    textAlign: 'center',
    color: 'rgba(52,52,66,.50)',
    lineHeight: 20,
    marginTop: 80
  }
})

export default Feed;
