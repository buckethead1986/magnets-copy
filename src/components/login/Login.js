import React from "react";
import { RaisedButton, FlatButton, TextField } from "material-ui";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    loginError: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLogin = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = this.state;
    fetch(`${this.props.url}/auth`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => {
        if (!json.error) {
          localStorage.setItem("token", json.jwt);
        } else {
          this.setState({
            loginError: true
          });
        }
      })
      .then(() => this.props.fetchUsers())
      .then(() => this.props.history.push("/profile"));
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form>
          {this.state.loginError === true ? (
            <TextField
              onChange={this.handleChange}
              name="username"
              hintText="Username"
              errorText="Username or Password incorrect"
            />
          ) : (
            <TextField
              onChange={this.handleChange}
              name="username"
              hintText="Username"
            />
          )}
          <br />
          <TextField
            onChange={this.handleChange}
            type="password"
            name="password"
            hintText="Password"
          />
        </form>
        <br />
        <RaisedButton
          label="Login"
          type="submit"
          primary={true}
          onClick={this.handleLogin}
        />
        <FlatButton
          label="Not a User?"
          primary={false}
          onClick={this.props.signup}
        />
      </div>
    );
  }
}

export default Login;
