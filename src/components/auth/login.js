import React, { Component, Fragment } from "react";
import decode from "jwt-decode";
import { Button, Form, Header, Segment, Message } from 'semantic-ui-react'

/* We want to import our 'AuthHelperMethods' component in order to send a login request */

class Login extends Component {
    /* In order to utilize our authentication methods within the AuthService class, we want to instantiate a new object */
    state = {
      email: "",
      password: "",
      emailError: false,
      authError: false
    }
    /* Fired off every time the use enters something into the input fields */
    _handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value, emailError: false });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      // eslint-disable-next-line no-useless-escape
      const matchEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email);
      this.setState({ emailError: (!matchEmail) });
      if (!matchEmail) {return}
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
    setGroupId = groupId => {
      localStorage.setItem("group_id", groupId);
    }
    getToken = () => {
      return localStorage.getItem("id_token");
    };
    getGroupId = () => {
      return localStorage.getItem("group_id");
    };

    logout = () => {
      console.log("logout!")
      localStorage.removeItem("id_token");
      localStorage.removeItem("group_id");

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
          body: JSON.stringify({
            email,
            password,
          })
        });
      if (response.ok) {
        const res = await response.json();
        if (res.login){
          this.setToken(res.token)
          this.setGroupId(res.user.section.groupId);
          this.props.history.replace("/sections");
        } else {
          console.log("error", res)
          this.setState({ authError: true });
        }
        /*Here is where all the login logic will go. Upon clicking the login button, we would like to utilize a login method that will send our entered credentials over to the server for verification. Once verified, it should store your token and send you to the protected route. */
      }
    }

    componentDidMount() {
      /* Here is a great place to redirect someone who is already logged in to the protected route */
      if (this.props.location.pathname === "/logout") {
        this.logout();
      }
    }

    render() {
        return (
          <Fragment>
            <Segment>
              <Header>Login</Header>
              <Form onSubmit={this.handleSubmit} error>
                <Form.Field>
                  <Form.Input
                    name="email"
                    type="text"
                    fluid
                    label='Email'
                    placeholder='mail@mail.com'
                    onChange={this._handleChange}
                    value={this.state.email}
                    error={this.state.emailError}
                    autoComplete="username"
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    name="password"
                    type="password"
                    fluid
                    label='Contraseña'
                    placeholder='********'
                    onChange={this._handleChange}
                    autoComplete="current-password"
                  />
                </Form.Field>
                {this.state.authError
                  && 
                  (<Fragment>
                    <Message
                      error
                      header='Error de autenticación'
                      content='Credenciales inválidas'
                    />
                  </Fragment>
                  )
                }
                <Button type='submit'>Iniciar sesión</Button>
              </Form>
            </Segment>
          </Fragment>
        );
    }
}
export default Login;
