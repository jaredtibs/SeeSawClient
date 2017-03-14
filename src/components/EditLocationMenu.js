import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';

class EditLocationMenu extends Component {
  constructor(props) {
    super(props)
  }

  _openDropdown() {
    this.refs.dropdown.show();
  }

  renderRow(rowData) {
    return(
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text> {rowData} </Text>
      </View>
    )
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
          dropdownStyle={styles.dropdown}
          ref="dropdown"
          options={['option 1', 'option 2']}
          defaultValue=""
          renderRow={(rowData) => this.renderRow(rowData)}>
        </ModalDropdown>
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

  dropdown: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 400
  },

  dropDownContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 400
  },

  moreLocationIcon: {
    color: '#FAF8F7',
  },
});

export default EditLocationMenu;
