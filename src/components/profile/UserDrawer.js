import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Row, Col } from "react-flexbox-grid";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
// import CreatePoemContainer from "../../components/containers/CreatePoemContainer";
import GuestCreatePoemContainer from "../../components/containers/GuestCreatePoemContainer";
import GuestProfileContainer from "../../components/containers/GuestProfileContainer";
import GuestShowPoem from "../../components/showPoem/GuestShowPoem";
import GuestPoemIndex from "../../components/showPoem/GuestPoemIndex";
import ProfileContainer from "../../components/containers/ProfileContainer";
import ShowPoem from "../../components/showPoem/ShowPoem";
import PoemIndex from "../../components/showPoem/PoemIndex";
// import ShowPoem from '../../components/showPoem/ShowPoem'
import Login from "../login/Login";
import Help from "../../components/help/Help";

const drawerWidth = 240;

let followed = [];
let unFollowed = [];

const styles = theme => ({
  root: {
    flexGrow: 1,
    // height: 430,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
    // height: "100%"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#2196F3"
  },
  flex: {
    flex: 1
  },
  drawerPaper: {
    position: "fixed",
    width: drawerWidth,
    height: "100%"
  },
  content: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.default, //background color for inset div
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
    height: "100%",
    paddingLeft: drawerWidth
  },
  toolbar: theme.mixins.toolbar
});

class UserDrawer extends React.Component {
  componentDidMount() {
    if (this.props.currUser.length !== 0 && this.props.users.length !== 0) {
      this.splitUsers(
        this.filterForCurrentUser(this.props.users),
        this.props.relationships
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.currUser.length !== 0 &&
      this.props.relationships !== nextProps.relationships
    ) {
      this.splitUsers(
        this.filterForCurrentUser(nextProps.users),
        nextProps.relationships
      );
    }
  }

  //removes the current user from the list of users
  filterForCurrentUser = userList => {
    return userList.filter(user => {
      return user.id !== this.props.currUser[0].id;
    });
  };

  //iterates through all relationships, when one has a follower_id (doing the following) equal to the current users id,
  //the user with the followed_id (being followed) of that relationship is pushed onto the followed array, and is removed
  //from the usersClone array.
  //I know there is the console warning 'dont make functions within a loop'. I needed to add the user associated with
  //the 'followed_id' based on the current users id equalling the 'follower_id'. If you know a better/good way to do this, please let me know.
  splitUsers = (users, relationships) => {
    let usersClone = users.slice(0);
    followed = [];
    unFollowed = [];
    for (var relationship in relationships) {
      let user;
      if (
        relationships[relationship].follower_id === this.props.currUser[0].id
      ) {
        user = users.find(user => {
          return user.id === relationships[relationship].followed_id;
        });
        followed.push(user);

        this.remove(usersClone, user);
      }
    }
    unFollowed = usersClone;
    // console.log(followed, unFollowed);
    // this.forceUpdate();
  };

  //removes selected element from the array
  remove = (array, element) => {
    const index = array.indexOf(element);
    if (index !== -1) {
      array.splice(index, 1);
    }
  };

  //returns list of users in the userdrawer. Modified depending on whether a user is logged in (Separates the current user out
  //and adds followed/unfollowed subheadings and splits other users accordingly if so)
  renderUsersList = () => {
    let users;
    if (this.props.currUser.length !== 0) {
      let filterUsersForCurrentUser = this.props.users.filter(user => {
        return user.id !== this.props.currUser[0].id;
      });

      users = (
        <div>
          <ListSubheader component="div">You</ListSubheader>
          <ListItem
            button
            key={this.props.currUser[0].id}
            onClick={() => this.props.usersLink(this.props.currUser[0].id)}
          >
            <img
              src={this.props.currUser[0].image}
              height="30"
              width="30"
              alt={`avatar for ${this.props.currUser[0].username}`}
            />
            <ListItemText primary={this.props.currUser[0].username} />
          </ListItem>
          <Divider />
          {this.renderFollowedAndUnfollowedUsers()}
        </div>
      );
    } else {
      users = this.props.users.map(user => {
        return this.mapUsersToListItem(user);
      });
    }
    return users;
  };

  //renders all other users in the userdrawer into subheaded lists of followed or unfollowed.
  renderFollowedAndUnfollowedUsers = () => {
    let followedUsers = followed.map(user => {
      return this.mapUsersToListItem(user);
    });
    let unFollowedUsers = unFollowed.map(user => {
      return this.mapUsersToListItem(user);
    });
    return (
      <div>
        {followedUsers.length !== 0 ? (
          <div>
            <ListSubheader component="div">Followed Users</ListSubheader>
            {followedUsers}
            <Divider />
          </div>
        ) : (
          ""
        )}
        <ListSubheader component="div">Unfollowed Users</ListSubheader>
        {unFollowedUsers}
      </div>
    );
  };

  //returns a ListItem of a single user
  mapUsersToListItem = user => {
    return (
      <ListItem
        button
        key={user.id}
        onClick={() => {
          this.props.currUser.length !== 0
            ? this.props.usersLink(user.id)
            : this.props.guestUsersLink(user.id);
        }}
      >
        <img
          src={user.image}
          height="30"
          width="30"
          alt={`avatar for ${user.username}`}
        />
        <ListItemText primary={user.username} />
      </ListItem>
    );
  };

  //renders common ListItems for seeing all poems and creating a new poem. Independant of whether a user is logged in
  renderNavigationItems = token => {
    if (token) {
      return (
        <div>
          <ListItem
            button
            key={"guestPoems"}
            onClick={() => this.props.showPoemsLink()}
          >
            <img
              src="https://cdn2.iconfinder.com/data/icons/lightly-icons/30/grid-480.png"
              height="30"
              width="30"
              alt="All Poems link"
            />

            <ListItemText primary="All Poems" />
          </ListItem>
          <ListItem
            button
            key={"poemCreation"}
            onClick={() => this.props.poemCreationLink()}
          >
            <img
              src="http://www.al-ayyam.ps/files/image/thumb/20150812085920.gif"
              height="30"
              width="30"
              alt="Poem Creation link"
            />
            <ListItemText primary="Poem Creation" />
          </ListItem>
        </div>
      );
    } else {
      return (
        <div>
          <ListItem
            button
            key={"guestPoems"}
            onClick={() => this.props.guestShowPoemsLink()}
          >
            <img
              src="https://cdn2.iconfinder.com/data/icons/lightly-icons/30/grid-480.png"
              height="30"
              width="30"
              alt="All Poems link"
            />

            <ListItemText primary="All Poems" />
          </ListItem>
          <ListItem
            button
            key={"poemCreation"}
            onClick={() => this.props.guestPoemCreationLink()}
          >
            <img
              src="http://www.al-ayyam.ps/files/image/thumb/20150812085920.gif"
              height="30"
              width="30"
              alt="Poem Creation link"
            />
            <ListItemText primary="Poem Creation" />
          </ListItem>
        </div>
      );
    }
  };

  // renders appbar buttons. Slight difference of pathways and text for logged in vs guest user.
  renderDrawer = classes => {
    let token = localStorage.getItem("token");
    return (
      <div>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {token ? (
              <Typography
                variant="title"
                className={classes.flex}
                color="inherit"
                onClick={() => this.props.poemCreationLink()}
              >
                MAGNETS
              </Typography>
            ) : (
              <Typography
                variant="title"
                className={classes.flex}
                color="inherit"
                onClick={() => this.props.guestPoemCreationLink()}
              >
                MAGNETS
              </Typography>
            )}
            <Button
              variant="outlined"
              onClick={() => this.props.helpLink()}
              style={{ flex: 0 }}
            >
              help
            </Button>
            {token ? (
              <Button
                variant="outlined"
                onClick={() => this.props.logoutLink()}
                style={{ flex: 0 }}
              >
                logout
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => this.props.loginLink()}
                style={{ flex: 0 }}
              >
                login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List>{this.renderNavigationItems(token)}</List>
          <Divider />
          <List>{this.renderUsersList()}</List>
        </Drawer>
      </div>
    );
  };

  //this renders the different routes based on the url path
  renderDivView = () => {
    return (
      <div>
        <Route
          exact
          path="/login"
          render={() => {
            return (
              <Login
                url={this.props.url}
                fetchUserInformation={this.props.fetchUserInformation}
                poemCreationLink={this.props.poemCreationLink}
                defaultImage={this.props.defaultImage}
              />
            );
          }}
        />
        <Route
          exact
          path="/help"
          render={props => {
            return <Help {...props} />;
          }}
        />
        <Route
          exact
          path="/guest"
          render={() => {
            return (
              <Grid fluid>
                <Row>
                  <Col
                    id="poemColumn"
                    style={{
                      flex: 1,
                      borderRadius: "50px 50px",
                      backgroundColor: ""
                    }}
                  >
                    <GuestCreatePoemContainer
                      url={this.props.url}
                      users={this.props.users}
                      store={this.props.store}
                      showPoemLink={this.props.showPoemLink}
                      words={this.props.words}
                    />
                  </Col>
                </Row>
              </Grid>
            );
          }}
        />
        <Route
          exact
          path="/guest/poems"
          render={() => {
            if (
              this.props.users.length !== 0 &&
              this.props.poems.length !== 0
            ) {
              return (
                <div>
                  <GuestPoemIndex
                    url={this.props.url}
                    guestShowPoemLink={this.props.guestShowPoemLink}
                    users={this.props.users}
                    currUser={this.props.currUser}
                    poems={this.props.poems}
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
          path="/guest/users/:id"
          render={() => {
            if (
              this.props.users.length !== 0 &&
              this.props.relationships.length !== 0 &&
              this.props.poems.length !== 0
            ) {
              return (
                <GuestProfileContainer
                  url={this.props.url}
                  currUser={this.props.currUser}
                  store={this.props.store}
                  guestShowPoemLink={this.props.guestShowPoemLink}
                  profileLink={this.props.profileLink}
                  users={this.props.users}
                  showUser={this.props.showUser}
                  poems={this.props.poems}
                  showUsers={this.props.showUsers}
                  guestPoemCreationLink={this.props.guestPoemCreationLink}
                />
              );
            } else {
              return "";
            }
          }}
        />
        <Route
          exact
          path="/guest/poems/:id"
          render={props => {
            if (this.props.poems.length !== 0) {
              return (
                <div>
                  <GuestShowPoem
                    url={this.props.url}
                    showPoemsLink={this.props.showPoemsLink}
                    users={this.props.users}
                    currUser={this.props.currUser}
                    poems={this.props.poems}
                    fetchPoems={this.props.fetchPoems}
                    // updateUsers={this.props.updateUsers}
                    profileLink={this.props.profileLink}
                    {...props}
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
              this.props.currUser.length !== 0 &&
              this.props.users.length !== 0 &&
              this.props.words.length !== 0
            ) {
              return (
                <Grid fluid>
                  <Row>
                    <Col
                      id="poemColumn"
                      style={{
                        flex: 1,
                        borderRadius: "50px 50px",
                        backgroundColor: ""
                      }}
                    >
                      <GuestCreatePoemContainer
                        url={this.props.url}
                        users={this.props.users}
                        words={this.props.words}
                        store={this.props.store}
                        currUser={this.props.currUser}
                        showPoemLink={this.props.showPoemLink}
                        fetchUserInformation={this.props.fetchUserInformation}
                      />
                    </Col>
                  </Row>
                </Grid>
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
              this.props.users.length !== 0 &&
              this.props.poems.length !== 0
            ) {
              return (
                <div>
                  <GuestPoemIndex
                    url={this.props.url}
                    currUser={this.props.currUser}
                    guestShowPoemLink={this.props.guestShowPoemLink}
                    showPoemLink={this.props.showPoemLink}
                    users={this.props.users}
                    poems={this.props.poems}
                    relationships={this.props.relationships}
                    favorites={this.props.favorites}
                    favoritePoem={this.props.favoritePoem}
                    followUser={this.props.followUser}
                    unFollowUser={this.props.unFollowUser}
                    unFavoritePoem={this.props.unFavoritePoem}
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
          path="/poems/:id"
          render={props => {
            if (this.props.poems.length !== 0) {
              return (
                <div>
                  <GuestShowPoem
                    url={this.props.url}
                    showPoemsLink={this.props.showPoemsLink}
                    currUser={this.props.currUser}
                    users={this.props.users}
                    poems={this.props.poems}
                    fetchPoems={this.props.fetchPoems}
                    updateUsers={this.props.updateUsers}
                    relationships={this.props.relationships}
                    favorites={this.props.favorites}
                    favoritePoem={this.props.favoritePoem}
                    followUser={this.props.followUser}
                    unFollowUser={this.props.unFollowUser}
                    unFavoritePoem={this.props.unFavoritePoem}
                    profileLink={this.props.profileLink}
                    {...props}
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
          path="/users/:id"
          render={() => {
            if (
              this.props.users.length !== 0 &&
              this.props.relationships.length !== 0 &&
              this.props.poems.length !== 0
            ) {
              return (
                <ProfileContainer
                  url={this.props.url}
                  currUser={this.props.currUser}
                  store={this.props.store}
                  showPoemLink={this.props.showPoemLink}
                  // profileLink={this.props.profileLink}
                  users={this.props.users}
                  // showUserLink={this.props.showUserLink}
                  poems={this.props.poems}
                  // showUsersLink={this.props.showUsersLink}
                  relationships={this.props.relationships}
                  favorites={this.props.favorites}
                  favoritePoem={this.props.favoritePoem}
                  followUser={this.props.followUser}
                  unFollowUser={this.props.unFollowUser}
                  unFavoritePoem={this.props.unFavoritePoem}
                  guestPoemCreationLink={this.props.guestPoemCreationLink}
                />
              );
            } else {
              return "";
            }
          }}
        />
      </div>
    );
  };

  //main render method. renderDrawer renders the list of users and navigation buttons. renderDivView
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderDrawer(classes)}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.renderDivView()}
        </main>
      </div>
    );
  }
}

UserDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserDrawer);
