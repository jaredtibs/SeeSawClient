import React, { Component } from 'react';

import {
  View,
  ListView,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

class EditLocationMenu extends Component {
  constructor(props) {
    super(props)
  }

  renderRow(rowData) {
    return(
      <View style={{flex: 1}}>
        <Text> {rowData} </Text>
      </View>
    )
  }

  render() {
    let nearbyLocations = ["one", "two", "three"]
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource = ds.cloneWithRows(nearbyLocations);

    return(
      <ListView
        enableEmptySections={true}
        dataSource={dataSource}
        contentContainerStyle={styles.dropdown}
        renderRow={(rowData) => this.renderRow(rowData)}>
      </ListView>
    )
  }
}

const styles = StyleSheet.create({
  dropdown: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    top: 60,
    left: 0,
    position: 'absolute',
    width: width,
    minHeight: 200
  }
});

export default EditLocationMenu;
