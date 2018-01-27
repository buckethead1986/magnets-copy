import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import ShowPoem from "./components/showPoem/ShowPoem";
import PoemIndex from "./components/showPoem/PoemIndex";

const url = "http://localhost:3001/api/v1";

class App extends Component {
  state = {
    users: [],
    currUser: {},
    relationships: [],
    poems: []
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

  profileLink = id => {
    this.props.history.push("/profile");
  };

  showPoems = () => {
    this.props.history.push("/poems");
  };

  showPoem = id => {
    this.fetchPoems();
    this.props.history.push(`/poems/${id}`);
  };

  makePoem = () => {
    this.props.history.push("/poem/new");
  };

  showUsers = () => {
    this.props.history.push("/users");
  };

  showUser = id => {
    this.props.history.push(`/users/${id}`);
  };

  fetchUserInformation = () => {
    fetch(`${url}/users`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          users: json
        })
      )
      .then(() => this.fetchCurrentUser())
      .then(() => this.fetchRelationships())
      .then(() => this.fetchPoems());
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

  fetchRelationships = () => {
    fetch(`${url}/relationships`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          relationships: json
        })
      );
  };

  fetchPoems = () => {
    fetch(`${url}/poems`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          poems: json
        })
      );
  };

  followUser = (follower_id, followed_id) => {
    console.log("following user", follower_id, followed_id);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    fetch(`${url}/relationships`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        follower_id: follower_id,
        followed_id: followed_id
      })
    }).then(() => this.fetchRelationships());
    // .then(res => res.json())
    // .then(json =>
    //   this.setState(
    //     {
    //       relationships: json
    //     },
    //     () => console.log(json)
    //   )
    // );
    // .then(json => console.log(json));
    // this.changeFollowed();
  };

  unFollowUser = (follower_id, followed_id) => {
    console.log("unfollowing user", this.state.relationships);
    const relationshipId = this.state.relationships.filter(relationship => {
      return (
        relationship.follower_id === follower_id &&
        relationship.followed_id === followed_id
      );
    })[0].id;
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    fetch(`${url}/relationships/${relationshipId}`, {
      method: "DELETE",
      headers: headers
    }).then(() => this.fetchRelationships());
    // .then(res => res.json())
    // .then(json => console.log(json));
    // this.changeFollowed();
  };

  render() {
    return (
      <div>
        {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/signup" ? (
          <Navbar
            logout={this.logout}
            makePoem={this.makePoem}
            profileLink={this.profileLink}
            showUsers={this.showUsers}
            showPoems={this.showPoems}
          />
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
          path="/profile"
          render={() => {
            return <div>Profile</div>;
          }}
        />
        <Route
          exact
          path="/users"
          render={() => {
            return <div>Users</div>;
          }}
        />
        <Route
          exact
          path="/users/id"
          render={() => {
            return <div>Specific User</div>;
          }}
        />
        <Route
          exact
          path="/poems"
          render={() => {
            if (
              this.state.currUser.length !== 0 &&
              this.state.relationships.length !== 0 &&
              this.state.users.length !== 0 &&
              this.state.poems.length !== 0
            ) {
              return (
                <div>
                  <PoemIndex
                    url={url}
                    showPoem={this.showPoem}
                    currUser={this.state.currUser}
                    poems={this.state.poems}
                    users={this.state.users}
                    followUser={this.followUser}
                    unFollowUser={this.unFollowUser}
                    relationships={this.state.relationships}
                    fetchRelationships={this.fetchRelationships}
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
          path="/poem/new"
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
            if (
              this.state.currUser.length !== {} &&
              this.state.poems.length !== 0
            ) {
              return (
                <div>
                  <ShowPoem
                    url={url}
                    currUser={this.state.currUser}
                    users={this.state.users}
                    poems={this.state.poems}
                    relationships={this.state.relationships}
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
