import React, { Component } from 'react';
import LoginForm from './LoginForm';
import Slider from './Slider';
import { Button } from './common';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  renderContent() {
    let result;
    switch (this.props.loggedIn) {
      case true:
        result = <Slider />;
        break;
      case false:
        result = <LoginForm authMethod={this.props.authMethod}/>;
        break;
      default:
        result = '';
        break;
    }
    return result;
  }

  render() {
    return <main id='main'>{this.renderContent()}</main>;
  }
}

export default Main;
