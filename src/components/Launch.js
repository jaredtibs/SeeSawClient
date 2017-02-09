import React, { Component } from 'react';
import {
  View,
} from 'react-native';

class Launch extends Component {
  render() {
    console.log(this.props)
    setTimeout(() => {
      this.props.checkUserSession();
    }, 50);
    return ( <View /> );
  }
}

export default Launch;
