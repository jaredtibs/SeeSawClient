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
    return(
      <View style={styles.row}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require('../assets/images/me_avatar.jpg')}
          />
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.username}> jmtibs </Text>
            <Text style={styles.voteCount}> {rowData.attributes['upvote-count']} </Text>
          </View>

          <View style={styles.cardBody}>
            <Text style={styles.postBody}> {rowData.attributes.body} </Text>
          </View>

          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.timestamp}>{rowData.attributes["created-at"]} ago</Text>
            </View>
          </View>
        </View>

        <View style={styles.voteContainer}>
          <TouchableOpacity
            style={styles.voteButton}
            onPress={() => this._vote(rowData.id, 'upvote')}>
            <Icon name='md-arrow-up' size={18} style={styles.voteIcon}></Icon>
          </TouchableOpacity>
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
        <View style={styles.feedButtonsContainer}>
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

  row: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    marginTop: 8
  },

  avatarContainer: {
    justifyContent: 'flex-start',
    marginTop: 25
  },

  cardContainer: {
    flex: 1
  },

  cardHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cardBody: {
    width: 285,
    height: 85,
    backgroundColor: 'white',
    borderRadius: 4,
    flexWrap: 'wrap',
    shadowOffset: {
      width: 0.5,
      height: 1
    },
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    shadowOpacity: 5
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  timestamp: {
    color: 'rgba(52,52,66,.30)',
    fontSize: 12,
    fontFamily: 'MaisonNeueTRIAL-Bold',
    marginTop: 7
  },

  postBody: {
    color: '#343442',
    fontSize: 15,
    fontFamily: 'MaisonNeueTRIAL-Medium',
    paddingTop: 12,
    paddingLeft: 8,
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
    color: 'rgba(52,52,66,.80)',
    fontSize: 12,
    fontFamily: 'MaisonNeueTRIAL-Bold'
  },

  emptyText: {
    color: 'white',
    fontFamily: 'Avenir',
    textAlign: 'center',
    color: '#D3D3D3',
  },

  voteContainer: {
    justifyContent: 'center'
  },

  voteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowOffset: {
      width: 0.5,
      height: 1
    },
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    shadowOpacity: 2
  },

  voteIcon: {
    color: '#343442'
  },

  voteCount: {
    color: 'rgba(52,52,66,.30)',
    fontSize: 12,
    fontFamily: 'GTPressuraMonoTrial-Bold',
    marginRight: -24,
    paddingBottom: 3
  }

})

export default Feed;
