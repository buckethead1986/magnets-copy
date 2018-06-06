import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";

// import { Grid, Row, Col } from "react-flexbox-grid";

// import { RaisedButton } from "material-ui";
import CreatePoemContainer from "./components/containers/CreatePoemContainer";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import ShowPoem from "./components/showPoem/ShowPoem";
import GuestShowPoem from "./components/showPoem/GuestShowPoem";
import PoemIndex from "./components/showPoem/PoemIndex";
import ProfileContainer from "./components/containers/ProfileContainer";
import GuestProfileContainer from "./components/containers/GuestProfileContainer";
import ChangeProfileImage from "./components/profile/ChangeProfileImage";
// import Tutorial from "./components/tutorial/Tutorial";
import GuestCreatePoemContainer from "./components/containers/GuestCreatePoemContainer";
import UserDrawer from "./components/profile/UserDrawer";

// const url = "https://magnets-api.herokuapp.com/api/v1";
const url = "http://localhost:3001/api/v1";

const defaultImage =
  "https://www.dltk-kids.com/puzzles/jigsaw/2013/puzzle-images/1222.jpg";

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
        this.fetchRelationships();
        this.fetchUsers();
        this.fetchPoems();
        this.fetchWords();
        this.props.history.push("/guest");
      }
    }
  }

  componentWillReceiveProps(nextProps) {}

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ users: [], currUser: [], favorites: [] });
    this.props.store.dispatch({
      type: "CHANGE_SHOWN_USER",
      payload: {}
    });
    this.props.history.push("/login");
  };

  signup = () => {
    this.props.history.push("/signup");
  };

  login = () => {
    this.props.history.push("/login");
  };

  guestPoemCreationLink = () => {
    this.props.history.push("/guest");
  };

  profileLink = () => {
    this.props.store.dispatch({
      type: "CHANGE_SHOWN_USER",
      payload: this.state.currUser[0]
    });
    this.props.history.push("/profile");
  };

  //Gets called when a guest user clicks a user to view their poems.  Calls a fetch to update to latest set of poems.
  guestUsersLink = id => {
    fetch(`${url}/users`)
      .then(res => res.json())
      .then(json => this.setState({ users: json }))
      .then(() => {
        this.props.store.dispatch({
          type: "CHANGE_SHOWN_USER",
          payload: this.state.users.filter(user => {
            return user.id === id;
          })[0]
        });
        this.props.history.push(`/guest/users/${id}`);
      });
  };

  helpLink = () => {
    this.props.history.push("/help");
  };

  showPoems = () => {
    this.props.history.push("/poems");
  };

  showPoem = id => {
    this.fetchPoems();
    this.props.history.push(`/poems/${id}`);
  };

  guestShowPoemLink = id => {
    this.props.history.push(`/guest/poems/${id}`);
  };

  guestShowPoemsLink = id => {
    this.props.history.push(`/guest/poems`);
  };

  //change all these to '-Link'
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

  //modifies state when a user deletes a poem, redirects to main profile page
  updateUsers = () => {
    const id = this.state.currUser[0].id;
    fetch(`${url}/users`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          users: json,
          currUser: json.filter(user => user.id === id)
        })
      )
      .then(() => this.profileLink());
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
      .then(() => {
        this.fetchRelationships();
        this.fetchPoems();
        this.fetchFavorites();
        this.fetchWords();
      });
  };

  fetchUsers = () => {
    fetch(`${url}/users`)
      .then(res => res.json())
      .then(json => this.setState({ users: json }));
  };

  //fetch request to API for the current User with authorization token, updates currUser state and calls updateShownUser
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
        const user = this.state.users.filter(user => {
          return user.id === json.id;
        });
        this.setState({
          currUser: user
        });
        this.updateShownUser(user);
      });
  };

  //updates redux store with user avatar and shownUser information.
  //shownUser is the user whos information currently shows on the profile page.
  updateShownUser = user => {
    if (this.state.currUser.length !== 0) {
      this.props.store.dispatch({
        type: "CHANGE_IMAGE",
        payload: user[0].image
      });
    } else {
      this.props.store.dispatch({
        type: "CHANGE_IMAGE",
        payload: this.defaultImage
      });
    }
    this.props.store.dispatch({
      type: "CHANGE_SHOWN_USER",
      payload: user[0]
    });
  };

  //fetches relationships between users
  fetchRelationships = () => {
    fetch(`${url}/relationships`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          relationships: json
        })
      );
  };

  //fetches all poems
  fetchPoems = () => {
    fetch(`${url}/poems`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          poems: json
        })
      );
  };

  //fetches all favorited_poems relationships
  fetchFavorites = () => {
    fetch(`${url}/favorited_poems`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          favorites: json
        })
      );
  };

  //fetches all words to be used. Stretch goal is to allow users to add new words. Currently, only possible via back end
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

  changeShownUser = id => {
    const shownUser = this.state.users.filter(user => {
      return user.id === id;
    })[0];
    this.setState({
      poems: this.state.poems.filter(poem => {
        return poem.user_id === id;
      }),
      shownUser: this.state.users.filter(user => {
        return user.id === shownUser.id;
      })[0]
    });
    this.props.store.dispatch({
      type: "CHANGE_SHOWN_USER",
      payload: shownUser
    });
  };

  //all the routes for the website, with the corresponding props being passed down.
  //The navbar only appears on non-login/signup pages
  //The routes are:
  //profile (main show page, holds user dropdown, and the poems and avatar of the currently selected user)
  //profile/new (changes your avatar image),
  //poems (shows all poems, selectable by favorites and/or by multiple selection of users)
  //poem/new (creation of new poems)
  //poems/:id (show page for a single poem)

  //all poems, wherever displayed, are able to be favorited and the author followed (and updates immediately. That was a challenge,
  //especially when showing just favorited poems on the poems index page).

  //A stretch goal is for de-favoriting to maintain the current scroll location on the page.
  //Currently, it rerenders back at the top of the page, which bugs me.
  render() {
    if (this.state.users.length !== 0) {
      return (
        <div>
          <UserDrawer
            url={url}
            users={this.state.users}
            words={this.state.words}
            poems={this.state.poems}
            store={this.props.store}
            showUser={this.showUser}
            showUsers={this.showUsers}
            showPoem={this.showPoem}
            showPoems={this.showPoems}
            profileLink={this.profileLink}
            login={this.login}
            fetchPoems={this.fetchPoems}
            fetchUsers={this.fetchUserInformation}
            relationships={this.state.relationships}
            updateUsers={this.updateUsers}
            guestUsersLink={this.guestUsersLink}
            guestShowPoemLink={this.guestShowPoemLink}
            guestPoemCreationLink={this.guestPoemCreationLink}
            guestShowPoemsLink={this.guestShowPoemsLink}
            helpLink={this.helpLink}
          />
        </div>
      );
    } else {
      return "";
    }
  }
}

export default withRouter(App);
