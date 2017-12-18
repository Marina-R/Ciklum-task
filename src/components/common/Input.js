import React, { Component } from 'react';

class Input extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='inputContainer'>
        <input
          id={this.props.id}
          className='formInput'
          type={this.props.inputType}
          placeholder={this.props.placeholder}
          value={this.props.value}
          style={this.props.inputStyle}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export { Input };
