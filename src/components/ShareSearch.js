import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux'

import {
  View,
  Text,
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

  _goBack() {
    Actions.pop({refresh: {keyboardShown: true}});
  }

  render() {
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

  cancelButton: {
    marginTop: 5,
    marginLeft: 10
  },

  cancelText: {
    fontSize: 14,
    color: '#303035',
    fontFamily: 'MaisonNeueTRIAL-Demi'
  }
});

export default ShareSearch;
