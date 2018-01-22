import React from "react";
import { RaisedButton, FlatButton, TextField } from "material-ui";

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    signupError: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = this.state;
    fetch(`${this.props.url}/users`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => {
        if (json.id !== null) {
          localStorage.setItem("token", json.jwt);
          this.props.history.push("/poem/new");
        } else {
          this.setState({
            signupError: true
          });
        }
      })
      .then(this.props.fetchUsers());
    // console.log(json);
  };

  // handleSubmitted = () => {
  //   const body = this.state;
  //   fetch(`${this.props.url}/auth`, {
  //     method: "POST",
  //     headers: this.props.headers,
  //     body: JSON.stringify(body)
  //   })
  //     .then(res => res.json())
  //     .then(json => {
  //       if (!json.error) {
  //         localStorage.setItem("token", json.jwt);
  //         this.props.history.push("/");
  //       }
  //     });
  // };

  render() {
    console.log(this.state);
    return (
      <div>
        <h2>Signup</h2>
        {this.state.signupError ? (
          <TextField
            onChange={this.handleChange}
            name="username"
            hintText="Username"
            errorText="Username already taken!"
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
          name="password"
          hintText="Password"
          type="password"
        />
        <br />
        <RaisedButton
          label="Submit"
          type="submit"
          primary={true}
          onClick={this.handleSubmit}
        />
        <FlatButton
          label="Back to Login"
          primary={false}
          onClick={this.props.login}
        />
      </div>
    );
  }
}

export default Signup;
