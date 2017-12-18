import React, { Component } from 'react';
import { render } from 'react-dom';
import * as firebase from 'firebase';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: null,
      buttonText: 'Sign Up',
      userName: ''
    };

    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onSignInClick = this.onSignInClick.bind(this);
  }

  onLogoutClick() {
    this.setState({loggedIn: false });
  }

  onSignInClick() {
    this.setState({buttonText: this.state.buttonText == 'Sign Up' ? 'Sign In': 'Sign Up' });
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

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true, userName: user.email });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    return (
      <section id='container'>
        <Header
          loggedIn={this.state.loggedIn}
          userName={this.state.userName}
          authMethod={this.state.buttonText}
          onSignInClick={this.onSignInClick}
         />
        <Main
          loggedIn={this.state.loggedIn}
          authMethod={this.state.buttonText}
         />
        <Footer
          loggedIn={this.state.loggedIn}
          onLogoutClick={this.onLogoutClick}
         />
      </section>
    )
  }
}

window.onload = () => {
  var root = document.createElement('div');
  root.id = 'react-root';
  document.body.appendChild(root);

  render(<App />, root);
}
