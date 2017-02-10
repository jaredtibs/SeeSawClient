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

class Feed extends Component {
  constructor(props) {
    super(props)
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
    locationId = this.props.location.data.data.id;
    this.props.toggleFeed(type, locationId);
  }

  _vote(postId, type) {
    this.props.castVote(postId, type)
  }

  renderEmptyState() {
    return(
      <View style={styles.emptyFeed}>
        <Text style={styles.emptyText}> There aren't any posts here yet. Be the first to leave one!</Text>
      </View>
    )
  }

  renderRow(rowData) {
    return (
      <View style={styles.row}>
        <View style={styles.cardHeader}>
          <View style={styles.userContainer}>
            <Image
              style={styles.avatar}
              source={require('../assets/images/me_avatar.jpg')}
            />
            <Text style={styles.username}> jmtibs </Text>
          </View>
          <View>
            <Icon name='ios-more' size={22} style={styles.moreIcon}></Icon>
          </View>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.postBody}> {rowData.attributes.body} </Text>
        </View>

        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.timestamp}>{rowData.attributes["created-at"]} ago</Text>
          </View>

          <View style={styles.votingContainer}>
            <TouchableOpacity
              style={styles.voteButton}
              onPress={() => this._vote(rowData.id, 'downvote')}>
              <Icon name='ios-arrow-round-down' size={22} style={styles.voteIcon}></Icon>
            </TouchableOpacity>

            <View style={{flex: 1}}>
              <Text style={styles.voteCount}> {rowData.attributes['upvote-count']} </Text>
            </View>

            <TouchableOpacity
              style={styles.voteButton}
              onPress={() => this._vote(rowData.id, 'upvote')}>
              <Icon name='ios-arrow-round-up' size={22} style={styles.voteIcon}></Icon>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    let currentFeed = this.props.feed.currentFeedType;

    return(
      <View style={styles.container}>
        <View style={styles.feedButtons}>
          <TouchableHighlight
            style={ currentFeed == 'recent' ? styles.buttonActiveContainer : styles.buttonContainer }
            underlayColor='#F2F2F4'
            onPress={() => this._toggleFeed('recent')}>
            <Text style={ currentFeed == 'recent' ? styles.buttonActiveText : styles.buttonText}>
              RECENT
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={ currentFeed == 'popular' ? styles.buttonActiveContainer : styles.buttonContainer }
            underlayColor='#F2F2F4'
            onPress={() => this._toggleFeed('popular')}>
            <Text style={ currentFeed == 'popular' ? styles.buttonActiveText : styles.buttonText}>
              POPULAR
            </Text>
          </TouchableHighlight>
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
    justifyContent: 'center',
    alignItems: 'center'
  },

  feedButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    padding: 10
  },

  buttonActiveContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#302F30',
  },

  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 30,
  },

  buttonText: {
    fontFamily: 'Calibre-Semibold',
    fontSize: 12,
    color: '#302F30',
    marginTop: 4
  },

  buttonActiveText: {
    fontFamily: 'Calibre-Semibold',
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 4
  },

  row: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: '#E7E7E9',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 1.0,
  },

  cardHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E9'
  },

  userContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  moreIcon: {
    color: 'rgba(25, 24, 26, 0.4)',
    paddingTop: 3,
    paddingRight: 5
  },

  cardBody: {
    flexWrap: 'wrap'
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },

  timestamp: {
    color: '#B3B2B6',
    fontSize: 14,
    fontFamily: 'Calibre-Regular',
    paddingLeft: 5
  },

  postBody: {
    color: '#848388',
    fontSize: 18,
    fontFamily: 'Calibre-Regular',
    paddingTop: 18,
    paddingLeft: 12,
    paddingRight: 12,
  },

  avatar: {
    width: 30,
    height: 30,
    borderColor: 'rgba(56, 55, 61, .20)',
    borderWidth: 1,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10
  },

  username: {
    color: '#302F30',
    fontSize: 14,
    fontFamily: 'Calibre-Semibold'
  },

  emptyText: {
    color: 'white',
    fontFamily: 'Avenir',
    textAlign: 'center',
    color: '#D3D3D3',
  },

  votingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  voteButton: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  voteIcon: {
    color: 'rgba(56, 55, 61, 0.5)'
  },

  voteCount: {
    color: '#38373D',
    fontSize: 14,
    fontFamily: 'Calibre-Semibold',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5
  }

})

export default Feed;
