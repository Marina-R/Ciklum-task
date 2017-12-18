import React, { Component } from 'react';

class Slider extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id='slider'>
        <div className='slider'></div>
        <div className='slider'></div>
        <div className='slider'></div>
      </section>
    );
  }
}

export default Slider;
