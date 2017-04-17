import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Settings from '../components/Settings';

class SettingsContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Settings { ... this.props } />
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return user
};

export default connect(mapStateToProps)(SettingsContainer);
