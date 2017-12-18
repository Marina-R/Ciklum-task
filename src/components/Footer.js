import React, { Component } from 'react';
import { Button, Spinner } from './common';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCutoRWzi0LnOsuK05vyZsYdFGz7TKEp2Y',
      authDomain: 'react-awesome.firebaseapp.com',
      databaseURL: 'https://react-awesome.firebaseio.com',
      projectId: 'react-awesome',
      storageBucket: 'react-awesome.appspot.com',
      messagingSenderId: '389608455939'
    });
  }

  onButtonPress() {
    let _this = this;
    return firebase.auth().signOut()
    .then(function() {
      _this.props.onLogoutClick();
      _this.setState({loggedIn: false });
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

  renderContent() {
    return this.props.loggedIn ? <Button id='logOutBtn' onClick={this.onButtonPress.bind(this)}>Log Out</Button> : '';
  }

  render() {
    return <footer id='footer'>{this.renderContent()}</footer>;
  }
}

export default Footer;
