import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class EditLocationMenu extends Component {
  constructor(props) {
    super(props)
  }

  _openDropdown() {
  }

  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this._openDropdown()}
        >
          <Icon name='ios-arrow-down-outline'
                size={18}
                style={styles.moreLocationIcon}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  dropDownContainer: {
    marginTop: 0,
    backgroundColor: 'white',
    width: 200
  },

  moreLocationIcon: {
    color: '#FAF8F7',
  },
});

export default EditLocationMenu;
