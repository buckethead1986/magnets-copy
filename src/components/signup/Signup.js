import React from "react";
import { RaisedButton, FlatButton, TextField } from "material-ui";

class Signup extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    const body = this.state;
    fetch(`${this.props.url}/users`, {
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
      // .then(this.handleSubmitted);
      .then(this.props.fetchUsers);
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
