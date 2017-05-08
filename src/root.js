import React, { Component } from 'react';
import { Provider } from 'react-redux'
import configureStore from './store/configure_store'

import App from './containers/app'
import { MenuContext } from 'react-native-popup-menu';

const store = configureStore()

class Root extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <MenuContext>
          <App />
        </MenuContext>
      </Provider>
    )
  }
}

export default Root;
