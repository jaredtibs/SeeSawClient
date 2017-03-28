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

import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import FeedTabs from '../components/FeedTabs';

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
    const permissions = rowData.attributes.permissions;
    const user = rowData.attributes.user.data.attributes;
    const visibility = rowData.attributes.visibility;
    const anonymous = (visibility == "anonymous");

    return(
      <View style={styles.row}>
        <View style={styles.avatarContainer}>
          { anonymous ?
            <View style={styles.anonymousAvatar}>
            </View>
              :
            <Image
              style={styles.avatar}
              source={
                user.avatar.url != null ?
                {uri: user.avatar.url} :
                require('../assets/images/default_avatar.jpeg')}
            />
          }
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            { anonymous ?
              <Text style={styles.username}> anonymous </Text>
              :
              <Text style={styles.username}> {user.username} </Text>
            }
            <Text style={permissions['voted-for'] ? styles.voteCountVoted : styles.voteCount}>
              {rowData.attributes['upvote-count']}
            </Text>
          </View>

          <View style={anonymous ? styles.anonymousCardBody : styles.cardBody}>
            <Text style={anonymous ? styles.anonymousPostBody : styles.postBody}> {rowData.attributes.body} </Text>
          </View>

          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.timestamp}>{rowData.attributes["created-at"]} ago</Text>
            </View>
          </View>
        </View>

        <View style={styles.voteContainer}>
          <TouchableOpacity
            style={permissions['voted-for'] ? styles.voteButtonVoted : styles.voteButton}
            onPress={() => {
              if (permissions['voted-for']) {
                this._vote(rowData.id, 'unvote')
              } else {
                this._vote(rowData.id, 'upvote')
              }
            }}>
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
    let currentFeed = (this.state.selectedFeed ? this.state.selectedFeed : this.props.feed.currentFeedType);
    let hasPosts = this.props.feed.posts.length > 0

    return(
      <View style={styles.container}>
      <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <FeedTabs />}
      >
        <View tabLabel="recent">
          {isFetching ?
            this.renderLoadingState() :
            this.renderFeedContent()
          }
        </View>

        <View tabLabel="popular">
          {isFetching ?
            this.renderLoadingState() :
            this.renderFeedContent()
          }
        </View>
        </ScrollableTabView>
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
    minHeight: 85,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'white',
    flexWrap: 'wrap',
    shadowOffset: {
      width: 0.5,
      height: 1
    },
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    shadowOpacity: 5
  },

  anonymousCardBody: {
    width: 285,
    minHeight: 85,
    backgroundColor: '#343442',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#343442',
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
    flex: 1,
    color: '#343442',
    fontSize: 15,
    fontFamily: 'MaisonNeueTRIAL-Medium',
    paddingTop: 12,
    paddingLeft: 8,
    paddingRight: 24,
    paddingBottom: 5,
    lineHeight: 22
  },

  anonymousPostBody: {
    color: '#FBFAF8',
    fontSize: 15,
    fontFamily: 'MaisonNeueTRIAL-Medium',
    paddingTop: 12,
    paddingLeft: 8,
    paddingRight: 24,
    paddingBottom: 5,
    lineHeight: 22
  },

  anonymousAvatar: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: '#331238',
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
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
    fontFamily: 'MaisonNeueTRIAL-Demi',
    fontSize: 12,
    textAlign: 'center',
    color: 'rgba(52,52,66,.50)',
    lineHeight: 20,
    marginTop: 80
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

  voteButtonVoted: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#23EC69',
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
    fontSize: 14,
    fontFamily: 'GTPressuraMonoTrial-Bold',
    marginRight: -20,
    paddingBottom: 3
  },

  voteCountVoted: {
    color: 'rgb(52,52,66)',
    fontSize: 14,
    fontFamily: 'GTPressuraMonoTrial-Bold',
    marginRight: -20,
    paddingBottom: 3
  }

})

export default Feed;
