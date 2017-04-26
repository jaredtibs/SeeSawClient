import React, { Component } from 'react';
import {
  View,
} from 'react-native';

class Launch extends Component {
  render() {
    setTimeout(() => {
      this.props.checkUserSession();
    }, 50);
    return ( <View /> );
  }
}

export default Launch;
