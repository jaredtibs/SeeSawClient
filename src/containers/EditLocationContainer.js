import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {openEditLocationMenu} from '../actions/location';

import EditLocationMenu from '../components/EditLocationMenu';

class EditLocationContainer extends Component {
  render() {
    return(
      <EditLocationMenu {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  const { location } = state;

  return {
    location
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    openEditLocationMenu: () => {
      dispatch(openEditLocationMenu())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLocationContainer);
