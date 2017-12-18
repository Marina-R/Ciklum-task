import React, { Component } from 'react';
import { RingLoader } from 'react-spinners';

class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return (
      <RingLoader
        loading={this.state.loading}
      />
    );
  }
}

export { Spinner };
