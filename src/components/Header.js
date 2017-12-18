import React, { Component } from 'react';
import { Button } from './common';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: 'Sign In'
    }
  }

  onButtonPress() {
    this.props.onSignInClick();
    this.setState({buttonText: this.state.buttonText == 'Sign Up' ? 'Sign In': 'Sign Up' });
  }

  renderContent() {
    let result;
    switch (this.props.loggedIn) {
      case true:
        result = <div id='welcomeMsg'>{this.props.userName}, welcome to our site!</div>;
        break;
      case false:
        result = <Button id='navBtn' onClick={this.onButtonPress.bind(this)}>{this.state.buttonText}</Button>;
        break;
      default:
        result = '';
        break;
    }
    return result;
  }

  render() {
    return <header id='header'>{this.renderContent()}</header>;
  }
}

export default Header;
