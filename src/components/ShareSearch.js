import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

class ShareSearch extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={styles.container}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default ShareSearch;
