import React from "react";
import Paper from "material-ui/Paper";
import Subheader from "material-ui/Subheader";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";

let followed = [];
let unFollowed = [];
const styles = {
  width: 250,
  margin: 20,
  maxHeight: window.innerHeight - 100,
  overflow: "auto"
};

class UsersList extends React.Component {
  componentDidMount() {
    this.splitUsers(
      this.filterForCurrentUser(this.props.users),
      this.props.relationships
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.relationships !== nextProps.relationships) {
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
    this.forceUpdate();
  };

  //removes selected element from an array
  remove = (array, element) => {
    const index = array.indexOf(element);
    if (index !== -1) {
      array.splice(index, 1);
    }
  };

  render() {
    const followedUsersList = followed.map(user => {
      return (
        <ListItem
          key={user.id}
          primaryText={user.username}
          insetChildren={true}
          leftAvatar={<Avatar src={user.image} />}
          onClick={() => this.props.changeShownUser(user.id)}
        />
      );
    });
    const unFollowedUsersList = unFollowed.map(user => {
      return (
        <ListItem
          key={user.id}
          primaryText={user.username}
          insetChildren={true}
          leftAvatar={<Avatar src={user.image} />}
          onClick={() => this.props.changeShownUser(user.id)}
        />
      );
    });
    if (followedUsersList.length > 0) {
      return (
        <Paper style={styles}>
          <List>
            <ListItem
              key={this.props.currUser[0].id}
              primaryText={this.props.currUser[0].username}
              insetChildren={true}
              leftAvatar={<Avatar src={this.props.currUser[0].image} />}
              onClick={() =>
                this.props.changeShownUser(this.props.currUser[0].id)}
            />
          </List>
          <List>
            <Subheader inset={true}>Followed</Subheader>
            {followedUsersList}
          </List>
          <Divider inset={true} />
          <List>
            <Subheader inset={true}>Unfollowed</Subheader>
            {unFollowedUsersList}
          </List>
        </Paper>
      );
    } else {
      return (
        <Paper style={styles}>
          <List>
            <ListItem
              key={this.props.currUser[0].id}
              primaryText={this.props.currUser[0].username}
              insetChildren={true}
              leftAvatar={<Avatar src={this.props.currUser[0].image} />}
              onClick={() =>
                this.props.changeShownUser(this.props.currUser[0].id)}
            />
          </List>
          <List>
            <Subheader inset={true}>Unfollowed</Subheader>
            {unFollowedUsersList}
          </List>
        </Paper>
      );
    }
  }
}

export default UsersList;
