import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserDrawer from "./components/profile/UserDrawer";

const url = "https://magnets-api.herokuapp.com/api/v1";
// const url = "http://localhost:3001/api/v1";

const defaultImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuyNps8d9m-xAllIL4UPQZ76BtwbSYNs4UmkLqi6e2s4UnpGoW";

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
      this.fetchRelationships();
      this.fetchUsers();
      this.fetchPoems();
      this.fetchWords();
      this.props.history.push("/guest");
    }
  }

  //all the links for the site. Passed down as props where required. links with the same name except 'guest' link to the same place, depending on if
  //a user if logged in or not
  logoutLink = () => {
    localStorage.removeItem("token");
    this.setState({ currUser: [], favorites: [] });
    this.props.store.dispatch({
      type: "CHANGE_SHOWN_USER",
      payload: {}
    });
    this.props.history.push("/guest");
  };

  loginLink = () => {
    this.props.history.push("/login");
  };

  guestPoemCreationLink = () => {
    this.props.history.push("/guest");
  };

  usersLink = id => {
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
        this.props.history.push(`/users/${id}`);
      });
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

  //all of these push url's to history for react router. Various components use different links to navigate the site
  helpLink = () => {
    this.props.history.push("/help");
  };

  showPoemsLink = () => {
    this.props.history.push("/poems");
  };

  showPoemLink = id => {
    this.fetchPoems();
    this.props.history.push(`/poems/${id}`);
  };

  guestShowPoemLink = id => {
    this.props.history.push(`/guest/poems/${id}`);
  };

  guestShowPoemsLink = id => {
    this.props.history.push(`/guest/poems`);
  };

  poemCreationLink = () => {
    this.props.history.push("/poem/new");
  };

  showUserLink = id => {
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
        this.setState(
          {
            users: json
          },
          () =>
            this.props.store.dispatch({
              type: "CHANGE_SHOWN_USER",
              payload: this.state.users.filter(user => {
                return user.id === this.state.currUser[0].id;
              })[0]
            })
        )
      )
      .then(() => this.showUserLink(id));
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
      // .then(() => {
      //   this.fetchRelationships();
      //   this.fetchPoems();
      //   this.fetchFavorites();
      //   this.fetchWords();
      // })
      .then(() => this.props.history.push("/poem/new"));
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
        this.setState(
          {
            currUser: user
          },
          () => {
            this.fetchRelationships();
            this.fetchPoems();
            this.fetchFavorites();
            this.fetchWords();
          }
        );
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

  //The UserDrawer prop list is enormous, I know. All child components stem off it, via react routes, for both 'guest' users and logged in user components.
  //I plan to refactor most of this into the redux store
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
            currUser={this.state.currUser}
            showPoemLink={this.showPoemLink}
            showPoemsLink={this.showPoemsLink}
            showUserLink={this.showUserLink}
            helpLink={this.helpLink}
            loginLink={this.loginLink}
            logoutLink={this.logoutLink}
            usersLink={this.usersLink}
            guestUsersLink={this.guestUsersLink}
            guestShowPoemLink={this.guestShowPoemLink}
            poemCreationLink={this.poemCreationLink}
            guestPoemCreationLink={this.guestPoemCreationLink}
            guestShowPoemsLink={this.guestShowPoemsLink}
            changeProfileImageLink={this.changeProfileImageLink}
            fetchPoems={this.fetchPoems}
            fetchUsers={this.fetchUsers}
            fetchUserInformation={this.fetchUserInformation}
            relationships={this.state.relationships}
            favorites={this.state.favorites}
            favoritePoem={this.favoritePoem}
            followUser={this.followUser}
            unFollowUser={this.unFollowUser}
            unFavoritePoem={this.unFavoritePoem}
            updateUsers={this.updateUsers}
            defaultImage={defaultImage}
          />
        </div>
      );
    } else {
      return "";
    }
  }
}

export default withRouter(App);
