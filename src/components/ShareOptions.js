import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class ShareOptions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const margin = this.props.heights[0] - this.props.heights[1];
    const { selectedUser } = this.props;

    if (this.props.visible) {
      return(
        <TouchableOpacity onPress={() => this.props.openUserSearch() }>
          <View style={[styles.container, {marginBottom: margin}]}>
            <View style={styles.options}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.optionsText}> To: </Text>
                <Text style={styles.visibilityText}>
                  { selectedUser.username ? selectedUser.username : "Everyone"}
                </Text>
              </View>

              <View>
                <Icon name='ios-person-add-outline' style={styles.addOption} size={28}></Icon>
              </View>
            </View>
          </View>
        </TouchableOpacity>
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
  },

  avatar: {
    width: 30,
    height: 30,
    borderColor: 'rgba(56, 55, 61, .20)',
    borderWidth: 1,
    borderRadius: 15
  }
});

export default ShareOptions
