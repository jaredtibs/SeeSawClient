import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const { width, height } = Dimensions.get('window');

class EditLocationMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View>
        <Menu opened={this.props.editingLocation} >
          <MenuTrigger text='Change your location' />
          <MenuOptions>
            <MenuOption value={1} text='One' />
            <MenuOption value={2}>
              <Text style={{color: 'red'}}>Two</Text>
            </MenuOption>
            <MenuOption value={3} disabled={true} text='Three' />
          </MenuOptions>
        </Menu>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dropdown: {
    flex: 1,
  }
});

export default EditLocationMenu;
