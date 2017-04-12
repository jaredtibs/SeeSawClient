import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
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
      <View style={styles.row}>
        <Text style={styles.locationName}> {rowData} </Text>
      </View>
    )
  }

  _getSize() {
    return {
      width: Dimensions.get('window').width
    }
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
          style={styles.dropdownContainer}
          dropdownStyle={[styles.dropdown, this._getSize()]}
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
    alignItems: 'center',
  },

  dropdownContainer: {
    //flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center'
  },

  dropdown: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  moreLocationIcon: {
    color: '#FAF8F7',
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

});

export default EditLocationMenu;
