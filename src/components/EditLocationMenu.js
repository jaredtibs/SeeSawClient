import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

class EditLocationMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={styles.dropdown}>
        <Text> change your location </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dropdown: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
    left: 0,
    width: width
  }
});

export default EditLocationMenu;
