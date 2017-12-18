import React, { Component } from 'react';
import firebase from 'firebase';
import { Button, Input, Spinner } from './common';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    };
  }

  onButtonPress() {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSucess.bind(this))
      .catch((error) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSucess.bind(this))
          .catch(this.onLoginFail.bind(this));
    });
  }

  onLoginSucess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    });
  }

  onLoginFail(error) {
    this.setState({
      error: error.message,
      loading: false
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner />;
    }

    return (
       <Button id='formBtn'
         onClick={this.onButtonPress.bind(this)}>{this.props.authMethod}
       </Button>
    );
  }

  handleUsernameChange(event) {
    this.setState({email: event.target.value, value: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value, value: event.target.value});
  }

  render() {
    return (
      <section id='loginForm'>
        <Input
          id='userName'
          inputType='text'
          placeholder='user@gmail.com'
          label='Email'
          value={this.state.email}
          onChange={this.handleUsernameChange.bind(this)}
        />

        <Input
          id='userPassword'
          inputType='password'
          placeholder='password'
          label='Password'
          value={this.state.password}
          onChange={this.handlePasswordChange.bind(this)}
        />

        <div className='inputContainer'>{this.renderButton()}</div>
        <p id='error'>{this.state.error}</p>
      </section>
    );
  }
}

export default LoginForm;
