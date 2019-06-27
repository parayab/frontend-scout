import React, { Component, Fragment } from "react";
import decode from "jwt-decode";
import { Button, Form, Header, Segment } from 'semantic-ui-react'

/* We want to import our 'AuthHelperMethods' component in order to send a login request */

class Login extends Component {
    /* In order to utilize our authentication methods within the AuthService class, we want to instantiate a new object */
    state = {
        email: "",
        password: ""
    }
    /* Fired off every time the use enters something into the input fields */
    _handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.handleLogin();
    }

    loggedIn = () => {
      // Checks if there is a saved token and it's still valid
      const token = this.getToken(); // Getting token from localstorage
      return !!token && !this.isTokenExpired(token); // handwaiving here
    };

    isTokenExpired = token => {
      try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
          // Checking if token is expired.
          return true;
        } else return false;
      } catch (err) {
        console.log("expired check failed! Line 42: AuthService.js");
        return false;
      }
    };

    setToken = idToken => {
      localStorage.setItem("id_token", idToken);
    };

    getToken = () => {
      return localStorage.getItem("id_token");
    };

    logout = () => {
      console.log("logout!")
      localStorage.removeItem("id_token");
    };

    getConfirm = () => {
      // Using jwt-decode npm package to decode the token
      const answer = decode(this.getToken());
      console.log("Recieved answer!", answer);
      return answer;
    };

    async handleLogin(e){
      const { email, password } = this.state
      const response = await fetch('session/login', {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          })
        });
      if (response.ok) {
        const res = await response.json();
        if (res.login){
          this.setToken(res.token)
        } else {
          console.log("error", res)
        }
        /*Here is where all the login logic will go. Upon clicking the login button, we would like to utilize a login method that will send our entered credentials over to the server for verification. Once verified, it should store your token and send you to the protected route. */
      }
    }

    componentWillMount() {
        /* Here is a great place to redirect someone who is already logged in to the protected route */
    }

    render() {
        return (
            <Fragment>
              <Segment>
                <Header>Login</Header>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Email</label>
                    <input
                      placeholder="mail@mail.com"
                      name="email"
                      type="text"
                      value={this.state.email}
                      onChange={this._handleChange}/>
                  </Form.Field>
                  <Form.Field>
                    <label>Contraseña</label>
                    <input
                      placeholder="********"
                      name="password"
                      type="password"
                      onChange={this._handleChange}
                    />
                  </Form.Field>
                  <Button type='submit'>Iniciar sesión</Button>
                  <Button onClick={this.logout}>Logout</Button>
                </Form>
              </Segment>
            </Fragment>
        );
    }
}
export default Login;
