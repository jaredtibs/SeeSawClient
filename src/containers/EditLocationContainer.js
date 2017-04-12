import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLocationContainer);
