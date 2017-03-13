import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';

class EditLocationMenu extends Component {
  constructor(props) {
    super(props)
  }

  _openDropdown() {
    const dropdown = this.refs.locationDropDown;
    dropdown.show();
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
        <ModalDropdown
          ref="locationDropDown"
          options={['option 1', 'option 2']}
          defaultValue=""
        >
        </ModalDropdown>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  moreLocationIcon: {
    color: '#FAF8F7',
  },
});

export default EditLocationMenu;
