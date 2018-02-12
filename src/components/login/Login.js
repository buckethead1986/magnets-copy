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
          this.props.history.push("/profile");
        } else {
          this.setState({
            loginError: true
          });
        }
      })
      .then(() => this.props.fetchUsers());
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
            <TextField

              name="username2"
              hintText="Username2"
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

// <div>
//   <h2>Login</h2>
//   {this.state.loginError === true ? (
//     <TextField
//       onChange={this.handleChange}
//       name="username"
//       hintText="Username"
//       errorText="Username or Password incorrect"
//     />
//   ) : (
//     <TextField
//       onChange={this.handleChange}
//       name="username"
//       hintText="Username"
//     />
//   )}
//   <br />
//   <TextField
//     onChange={this.handleChange}
//     type="password"
//     name="password"
//     hintText="Password"
//   />
//   <br />
//   <RaisedButton
//     label="Login"
//     type="submit"
//     primary={true}
//     onClick={this.handleLogin}
//   />
//   <FlatButton
//     label="Not a User?"
//     primary={false}
//     onClick={this.props.signup}
//   />
// </div>
