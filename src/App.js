import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import ShowPoem from "./components/showPoem/ShowPoem";

const url = "http://localhost:3001/api/v1";

class App extends Component {
  state = {
    users: [],
    currUser: {}
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

  showPoem = id => {
    this.props.history.push(`/poems/${id}`);
  };

  createPoem = () => {
    this.props.history.push("/");
  };

  fetchUserInformation = () => {
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
    fetch(`${url}/current_user`, {
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(json =>
        this.setState({
          currUser: json
        })
      );
  };

  render() {
    return (
      <div>
        {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/signup" ? (
          <Navbar logout={this.logout} createPoem={this.createPoem} />
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
                    currUser={this.state.currUser}
                    showPoem={this.showPoem}
                  />
                </div>
              );
            } else {
              return "";
            }
          }}
        />
        <Route
          exact
          path="/poems/:id"
          render={() => {
            return (
              <div>
                <ShowPoem url={url} />
              </div>
            );
          }}
        />
      </div>
    );
  }
}

export default withRouter(App);
