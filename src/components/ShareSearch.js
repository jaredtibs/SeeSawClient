import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux'

import {
  View,
  ListView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

//import { InstantSearch } from 'react-instantsearch/dom';
/*

<InstantSearch
  appId="latency"
  apiKey="3d9875e51fbd20c7754e65422f7ce5e1"
  indexName="bestbuy"
>
</InstantSearch>
*/

class ShareSearch extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchSuggestedUsers();
  }

  _goBack() {
    Actions.pop({refresh: {keyboardShown: true}});
  }

  renderRow(rowData) {
    const data = rowData.attributes;

    return(
      <TouchableOpacity
        style={styles.userRow}
        onPress={() => console.log(data)}
      >
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={
              data.avatar.url != null ?
              {uri: data.avatar.url} :
              require('../assets/images/default_avatar.jpeg')
            }
          />
        </View>

        <View style={styles.additionalInfoContainer}>
          <Text style={styles.username}> {data.username} </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { suggestedUsers } = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource = ds.cloneWithRows(suggestedUsers);

    return(
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={ () => this._goBack() }
          >
            <Text style={styles.cancelText}> Cancel </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchBar}>
          <Text style={styles.searchHeader}> Post To: </Text>
          <TextInput
            style={styles.input}
            autoFocus={true}
            autoCorrect={false}
            ref="searchInput"
            returnKeyType='search'
            placeholder="Search"
            placeholderTextStyle={styles.searchPlaceHolderStyle}
            onChangeText={(text) => console.log(text)}
          />
        </View>

        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeaderText}> Suggested </Text>
        </View>

        <View style={{flex: 1}}>
          <ListView
            enableEmptySections={true}
            dataSource={dataSource}
            style={styles.userList}
            renderRow={(rowData) => this.renderRow(rowData)}/>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 65,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1'
  },

  searchHeader: {
    fontFamily: 'MaisonNeueTRIAL-Medium',
    fontSize: 14,
    color: '#2F2F30',
    marginLeft: 10
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50
  },

  searchPlaceHolderStyle: {
    fontFamily: 'MaisonNeueTRIAL-Medium',
    color: '#CECED1'
  },

  input: {
    flex: 1,
    marginLeft: 5,
    fontSize: 14
  },

  subHeaderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },

  subHeaderText: {
    fontSize: 12,
    fontFamily: 'MaisonNeueTRIAL-Medium',
    color: '#CECED1',
    paddingLeft: 10
  },

  cancelButton: {
    marginTop: 5,
    marginLeft: 10
  },

  cancelText: {
    fontSize: 14,
    color: '#303035',
    fontFamily: 'MaisonNeueTRIAL-Demi'
  },

  userList: {
    flex: 1,
    height: 1000
  },

  userRow: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .95)',
  },

  avatarContainer: {
    flexDirection: 'row',
    width: 45,
    marginLeft: 20
  },

  avatar: {
    width: 30,
    height: 30,
    borderColor: 'rgba(56, 55, 61, .20)',
    borderWidth: 1,
    borderRadius: 15
  },

  additionalInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  username: {
    fontSize: 12,
    color: '#96959C',
    fontFamily: 'MaisonNeueTRIAL-Bold'
  }

});

export default ShareSearch;
