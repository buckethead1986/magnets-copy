import React from "react";
import { RaisedButton, FlatButton, TextField } from "material-ui";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLogin = () => {
    const body = this.state;
    fetch(`${this.props.url}/auth`, {
      method: "POST",
      headers: this.props.headers,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => {
        if (!json.error) {
          localStorage.setItem("token", json.jwt);
          this.props.history.push("/");
        }
      })
      .then(() => this.props.fetchUsers());
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        <TextField
          onChange={this.handleChange}
          name="username"
          hintText="Username"
        />
        <br />
        <TextField
          onChange={this.handleChange}
          name="password"
          hintText="Password"
        />
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
