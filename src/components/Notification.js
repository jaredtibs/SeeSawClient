import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

class Notification extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={styles.row}>
        <Image
          style={styles.avatar}
          source={require('../assets/images/default_avatar.jpeg')}
        />
        <Text> {this.props.notification} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: 54,
    alignItems: 'center'
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

});

export default Notification;
