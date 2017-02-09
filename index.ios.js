import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import Root from './src/root';

class SeeSawClient extends Component {
  render() {
    return (
      <Root />
    );
  }
}

AppRegistry.registerComponent('SeeSawClient', () => SeeSawClient);
