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
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import GuestCreatePoemContainer from "../../components/containers/GuestCreatePoemContainer";
import GuestProfileContainer from "../../components/containers/GuestProfileContainer";
import GuestShowPoem from "../../components/showPoem/GuestShowPoem";
import GuestPoemIndex from "../../components/showPoem/GuestPoemIndex";
import Help from "../../components/help/Help";

const drawerWidth = 240;

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
    position: "relative",
    width: drawerWidth,
    height: "100%"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
    height: "100%"
  },
  toolbar: theme.mixins.toolbar
});

class ClippedDrawer extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    let users = this.props.users.map(user => {
      return (
        <ListItem
          button
          key={user.id}
          onClick={() => this.props.guestUsersLink(user.id)}
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
    });
    this.setState({
      users: users
    });
  }

  renderNavigationItems = () => {
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
  };

  renderDrawer = classes => {
    return (
      <div>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
              onClick={() => this.props.guestPoemCreationLink()}
            >
              MAGNETS
            </Typography>
            <Button
              variant="outlined"
              onClick={() => this.props.helpLink()}
              style={{ flex: 0 }}
            >
              help
            </Button>
            <Button
              variant="outlined"
              onClick={() => this.props.loginLink()}
              style={{ flex: 0 }}
            >
              login
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List>{this.renderNavigationItems()}</List>
          <Divider />
          <List>{this.state.users}</List>
        </Drawer>
      </div>
    );
  };

  renderDivView = () => {
    return (
      <div>
        <Route
          exact
          path="/login"
          render={() => {
            return (
              <div>
                <div>Hey</div>
              </div>
            );
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
                      showPoem={this.props.showPoem}
                      words={this.props.words}
                      fetchUsers={this.props.fetchUserInformation}
                      login={this.props.login}
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
          path="/help"
          render={props => {
            return <Help {...props} />;
          }}
        />
      </div>
    );
  };

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

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClippedDrawer);
