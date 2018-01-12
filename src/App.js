import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";

const url = "http://localhost:3001/api/v1";
let z = 0;

class App extends Component {
  state = {
    users: [],
    currUser: {}
  };

  increaseZ = () => {
    console.log("increasing z", z);
    z++;
    console.log(z);
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.fetchUserInformation();
    } else {
      if (!window.location.href.includes("signup")) {
        this.props.history.push("/login");
      }
    }
  }

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ users: [] });
    this.props.history.push("/login");
  };

  signup = () => {
    this.props.history.push("/signup");
  };

  login = () => {
    this.props.history.push("/login");
  };

  fetchUserInformation = () => {
    console.log("fetching user information");
    fetch(`${url}/users`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          users: json
        })
      )
      .then(() => this.fetchCurrentUser());
  };

  fetchCurrentUser = () => {
    console.log("fetchCurrentUser");
    fetch(`${url}/current_user`, {
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(json =>
        this.setState(
          {
            currUser: json
          },
          () => console.log(this.state.currUser)
        )
      );
  };

  render() {
    return (
      <div>
        {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/signup" ? (
          <Navbar logout={this.logout} increaseZ={this.increaseZ} />
        ) : (
          ""
        )}
        <div className="App">
          <Route
            exact
            path="/signup"
            render={props => (
              <Signup
                url={url}
                fetchUsers={this.fetchUserInformation}
                login={this.login}
                {...props}
              />
            )}
          />
        </div>
        <div className="App">
          <Route
            exact
            path="/login"
            render={props => (
              <Login
                url={url}
                fetchUsers={this.fetchUserInformation}
                signup={this.signup}
                {...props}
              />
            )}
          />
        </div>
        <Route
          exact
          path="/"
          render={() => {
            if (this.state.currUser.length !== 0) {
              return (
                <div>
                  <Main
                    url={url}
                    users={this.state.users}
                    store={this.props.store}
                  />
                </div>
              );
            } else {
              return "";
            }
          }}
        />
      </div>
    );
  }
}

export default withRouter(App);
