import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class ShareOptions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const margin = this.props.heights[0] - this.props.heights[1]
    console.log(this.props)

    if (this.props.visible) {
      return(
        <View style={[styles.container, {marginBottom: margin}]}>
          <View style={styles.options}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.optionsText}> Share with: </Text>
              <Text style={styles.visibilityText}> Everyone </Text>
            </View>

            <View>
              <Icon name='ios-person-add-outline' style={styles.addOption} size={28}></Icon>
            </View>
          </View>
        </View>
      )
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB'
  },

  options: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  optionsText: {
    color: '#9B9B9B',
    fontSize: 14,
    fontFamily: 'MaisonNeueTRIAL-Medium',
    marginLeft: 19
  },

  visibilityText: {
    color: '#9B9B9B',
    fontSize: 14,
    fontFamily: 'MaisonNeueTRIAL-Bold',
  },

  addOption: {
    color: '#9B9B9B',
    marginRight: 19
  }
});

export default ShareOptions
