import React, { Component } from 'react';
import { Provider } from 'react-redux'
import configureStore from './store/configure_store'

import App from './containers/app'

const store = configureStore()

class Root extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

export default Root;
