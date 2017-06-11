import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class FeedCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const post = this.props.postData;
    const permissions = post.attributes.permissions;
    const user = post.attributes.user.data.attributes;
    const visibility = post.attributes.visibility;
    const anonymous = (visibility == "anonymous");

    return(
      <View style={styles.row}>
        <View style={styles.avatarContainer}>
          { anonymous ?
            <Image
              style={styles.avatar}
              source={require('../assets/images/anonymous_avatar.png')}
            />
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
              {post.attributes['upvote-count']}
            </Text>
          </View>

          <View style={anonymous ? styles.anonymousCardBody : styles.cardBody}>
            <Text style={anonymous ? styles.anonymousPostBody : styles.postBody}>{post.attributes.body}</Text>
          </View>

          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.timestamp}>{post.attributes["created-at"]} ago</Text>
            </View>
          </View>
        </View>

        <View style={styles.voteContainer}>
          <TouchableOpacity
            style={permissions['voted-for'] ? styles.voteButtonVoted : styles.voteButton}
            onPress={() => {
              if (permissions['voted-for']) {
                this.props.castVote(post.id, 'unvote')
              } else {
                this.props.castVote(post.id, 'upvote')
              }
            }}>
            <Icon name='md-arrow-up' size={18} style={styles.voteIcon}></Icon>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    minHeight: 40,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'white',
    flexWrap: 'wrap'
  },

  anonymousCardBody: {
    width: 285,
    minHeight: 40,
    backgroundColor: '#343442',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#343442',
    flexWrap: 'wrap',
    //shadowOffset: {
    // width: 0.5,
    // height: 1
    //},
    //shadowColor: 'rgba(0, 0, 0, 0.17)',
    //shadowOpacity: 5
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
    fontSize: 14,
    fontFamily: 'MaisonNeueTRIAL-Medium',
    paddingTop: 8,
    paddingLeft: 12,
    paddingRight: 24,
    paddingBottom: 8,
    lineHeight: 22
  },

  anonymousPostBody: {
    color: '#FBFAF8',
    fontSize: 14,
    fontFamily: 'MaisonNeueTRIAL-Medium',
    paddingTop: 8,
    paddingLeft: 12,
    paddingRight: 24,
    paddingBottom: 8,
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
    borderWidth: 3,
    borderColor: '#FAF8F7'
    //shadowOffset: {
    //  width: 0.5,
    //  height: 1
    //},
    //shadowColor: 'rgba(0, 0, 0, 0.17)',
    //shadowOpacity: 2
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
    marginRight: -18,
    paddingBottom: 3
  },

  voteCountVoted: {
    color: 'rgb(52,52,66)',
    fontSize: 14,
    fontFamily: 'GTPressuraMonoTrial-Bold',
    marginRight: -18,
    paddingBottom: 3
  }
});

export default FeedCard;
