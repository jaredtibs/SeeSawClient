import React, { Component, PropTypes } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { connect } from 'react-redux';

const RouterWithRedux = connect()(Router);

import LaunchContainer from './LaunchContainer';
import Landing from '../components/Landing';
import LocationIntro from '../components/LocationIntro';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';
import MainContainer from './MainContainer';
import ShareFormContainer from './ShareFormContainer';
import SettingsContainer from './SettingsContainer';

class App extends Component {
  constructor(props) {
   super(props)
  }

  render() {
    return (
      <RouterWithRedux>
        <Scene key="root" hideNavBar={true}>
          <Scene key="launch" component={LaunchContainer} title="Launch" />
          <Scene key="landing" component={Landing} title="Landing"/>
          <Scene key="locationIntro" component={LocationIntro} title="LocationIntro"/>
          <Scene key="login" component={LoginContainer} title="Login"/>
          <Scene key="register" component={RegisterContainer} title="Register"/>
          <Scene key="main" component={MainContainer} title="Main"/>
          <Scene key="shareForm" direction='vertical' component={ShareFormContainer} title="Share"/>
          <Scene key="settings"  direction='vertical' component={SettingsContainer} title="Settings" initial={true}/>
        </Scene>
      </RouterWithRedux>
    )
  }
}

export default App;
