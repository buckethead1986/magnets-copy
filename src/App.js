import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import "./App.css";
import CreatePoemContainer from "./components/CreatePoemContainer";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import ShowPoem from "./components/showPoem/ShowPoem";
import PoemIndex from "./components/showPoem/PoemIndex";
import ProfileContainer from "./components/ProfileContainer";
import ChangeProfileImage from "./components/profile/ChangeProfileImage";

// const url = "http://localhost:3001/api/v1";
const url = "https://magnet-fridge-api.herokuapp.com/api/v1";
const defaultImage =
  "http://www.dltk-kids.com/puzzles/jigsaw/2013/puzzle-images/1222.jpg";

class App extends Component {
  state = {
    users: [],
    currUser: [],
    relationships: [],
    poems: [],
    favorites: [],
    words: []
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
    this.setState({ users: [], currUser: [], favorites: [] });
    this.props.history.push("/login");
  };

  signup = () => {
    this.props.history.push("/signup");
  };

  login = () => {
    this.props.history.push("/login");
  };

  profileLink = () => {
    this.props.store.dispatch({
      type: "CHANGE_SHOWN_USER",
      payload: this.state.currUser[0]
    });
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

  changeProfileImageLink = () => {
    this.props.history.push("/profile/new");
  };

  fetchUserInformation = () => {
    fetch(`${url}/users`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          users: json
        })
      )
      .then(() => {
        this.fetchCurrentUser();
        this.fetchRelationships();
        this.fetchPoems();
        this.fetchFavorites();
        this.fetchWords();
      });
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
      .then(json => {
        this.setState(
          {
            currUser: this.state.users.filter(user => {
              return user.id === json.id;
            })
          },
          () => {
            this.props.store.dispatch({
              type: "CHANGE_IMAGE",
              payload: this.state.currUser[0].image
            });
            this.props.store.dispatch({
              type: "CHANGE_SHOWN_USER",
              payload: this.state.users.filter(user => {
                return user.id === json.id;
              })[0]
            });
          }
        );
      });
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

  fetchFavorites = () => {
    fetch(`${url}/favorited_poems`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          favorites: json
        })
      );
  };

  fetchWords = () => {
    fetch(`${url}/words`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          words: json
        })
      );
  };

  //fetch request to post a new user following relationship
  followUser = (follower_id, followed_id) => {
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
  };

  //deletes an active user following relationship
  unFollowUser = (follower_id, followed_id) => {
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
  };

  //posts a new favorite poem relationship
  favoritePoem = (user_id, poem_id) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    fetch(`${url}/favorited_poems`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        user_id: user_id,
        poem_id: poem_id
      })
    }).then(() => {
      this.fetchFavorites();
      this.fetchPoems();
    });
  };

  //deletes a current favorite poem relationship
  unFavoritePoem = (user_id, poem_id) => {
    console.log("unFavoritePoem", user_id, poem_id);
    const favorites = this.state.favorites.filter(favorite => {
      return favorite.user_id === user_id && favorite.poem_id === poem_id;
    })[0].id;
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    fetch(`${url}/favorited_poems/${favorites}`, {
      method: "DELETE",
      headers: headers
    }).then(() => {
      this.fetchFavorites();
      this.fetchPoems();
    });
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
        <div style={{ textAlign: "center" }}>
          <Route
            exact
            path="/signup"
            render={props => (
              <Signup
                url={url}
                fetchUsers={this.fetchUserInformation}
                login={this.login}
                defaultImage={this.defaultImage}
                {...props}
              />
            )}
          />
        </div>
        <div style={{ textAlign: "center" }}>
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
            if (
              this.state.users.length !== 0 &&
              this.state.relationships.length !== 0 &&
              this.state.currUser.length !== 0 &&
              this.state.poems.length !== 0
            ) {
              return (
                <ProfileContainer
                  url={url}
                  store={this.props.store}
                  showPoem={this.showPoem}
                  currUser={this.state.currUser}
                  users={this.state.users}
                  showUser={this.showUser}
                  poems={this.state.poems}
                  followUser={this.followUser}
                  unFollowUser={this.unFollowUser}
                  relationships={this.state.relationships}
                  favoritePoem={this.favoritePoem}
                  unFavoritePoem={this.unFavoritePoem}
                  favorites={this.state.favorites}
                  changeProfileImageLink={this.changeProfileImageLink}
                  showUsers={this.showUsers}
                />
              );
            } else {
              return "";
            }
          }}
        />
        <Route
          exact
          path="/profile/new"
          render={() => {
            if (this.state.currUser.length !== 0) {
              return (
                <ChangeProfileImage
                  url={url}
                  store={this.props.store}
                  currUser={this.state.currUser}
                  profileLink={this.profileLink}
                  fetchCurrentUser={this.fetchCurrentUser}
                />
              );
            } else {
              return "";
            }
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
                    users={this.state.users}
                    poems={this.state.poems}
                    followUser={this.followUser}
                    unFollowUser={this.unFollowUser}
                    relationships={this.state.relationships}
                    favoritePoem={this.favoritePoem}
                    unFavoritePoem={this.unFavoritePoem}
                    favorites={this.state.favorites}
                    defaultImage={this.defaultImage}
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
            if (
              this.state.currUser.length !== 0 &&
              this.state.words.length !== 0
            ) {
              return (
                <div>
                  <CreatePoemContainer
                    url={url}
                    users={this.state.users}
                    store={this.props.store}
                    currUser={this.state.currUser}
                    showPoem={this.showPoem}
                    words={this.state.words}
                    fetchUsers={this.fetchUserInformation}
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
          render={props => {
            if (
              this.state.currUser.length !== {} &&
              this.state.poems.length !== 0
            ) {
              return (
                <div>
                  <ShowPoem
                    url={url}
                    showPoems={this.showPoems}
                    currUser={this.state.currUser}
                    users={this.state.users}
                    poems={this.state.poems}
                    followUser={this.followUser}
                    unFollowUser={this.unFollowUser}
                    relationships={this.state.relationships}
                    favoritePoem={this.favoritePoem}
                    unFavoritePoem={this.unFavoritePoem}
                    favorites={this.state.favorites}
                    {...props}
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

// function mapStateToProps(state, ownProps) {
//   return {
//     shownUser: state.shownUser
//   };
// }
//
// export default connect(mapStateToProps)(withRouter(App));

export default withRouter(App);
