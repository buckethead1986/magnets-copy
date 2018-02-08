import React from "react";
import MobileTearSheet from "./MobileTearSheet";
import Paper from "material-ui/Paper";
import Subheader from "material-ui/Subheader";
import { List, ListItem } from "material-ui/List";
import ActionGrade from "material-ui/svg-icons/action/grade";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import { pinkA200, transparent } from "material-ui/styles/colors";

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

  //removes the current user from the list of users
  filterForCurrentUser = userList => {
    return userList.filter(user => {
      return user.id !== this.props.currUser[0].id;
    });
  };

  //iterates through all relationships, when one has a follower_id (doing the following) equal to the current users id,
  //the user with the followed_id (being followed) of that relationship is pushed onto the followed array, and is removed
  //from the usersClone array.
  splitUsers = (users, relationships) => {
    let usersClone = users.slice(0);
    followed = [];
    unFollowed = [];

    for (var relationship in relationships) {
      if (
        relationships[relationship].follower_id === this.props.currUser[0].id
      ) {
        const user = users.find(user => {
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
        />
      );
    });
    return (
      <Paper style={styles}>
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
  }
}

export default UsersList;
