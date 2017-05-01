import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';

class DropdownMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <ModalDropdown
        ref="dropdown"
        style={styles.dropdown}
        options={this.props.options}>
      </ModalDropdown>
    )
  }
}

const styles = StyleSheet.create({
  dropdown: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default DropdownMenu;
