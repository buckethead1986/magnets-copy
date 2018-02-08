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

//splits the list of users into followed and unfollowed categories minus the current user, and creates list it
class UsersList extends React.Component {
  // constructor() {
  //   super();
  //
  //   this.state = {
  //     users: []
  //   };
  // }
  componentDidMount() {
    console.log("componentDidMount", this.props.relationships);
    this.splitUsers(
      this.filterForCurrentUser(this.props.users),
      this.props.relationships
    );
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("should component update");
  //   console.log(this.props.currUser[0].id, nextProps.currUser[0].id);
  //   return this.props.relationships === nextProps.relationships;
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.log(
  //     "componentWillReceiveProps",
  //     this.props.relationships,
  //     nextProps.relationships
  //   );
  //   if (this.props.relationships !== nextProps.relationships) {
  //     // this.setState({
  //     //
  //     // })
  //     this.splitUsers(
  //       this.filterForCurrentUser(nextProps.users),
  //       nextProps.relationships
  //     );
  //   }
  // }

  filterForCurrentUser = userList => {
    return userList.filter(user => {
      return user.id !== this.props.currUser[0].id;
    });
  };

  splitUsers = (users, relationships) => {
    followed = [];
    unFollowed = [];
    users.filter(user => {
      return user.id === this.props.currUser[0].id;
    });

    // for (var arr in users) {
    //   console.log(users[arr].id, this.props.currUser[0].id);
    //   for (var filter in following) {
    //     console.log(users);
    //     console.log(users[arr], following[filter]);
    //     if (users[arr].id === following[filter].id) {
    //       this.remove(users, users[arr]);
    //     }
    //   }
    // }
    console.log(users, relationships, this.props.currUser[0].following);
    // let x = [];
    for (var relationship in relationships) {
      console.log(relationships[relationship]);
      if (
        relationships[relationship].follower_id === this.props.currUser[0].id
      ) {
        followed.push(
          users.find(user => {
            console.log(user, relationships[relationship]);
            return user.id === relationships[relationship].followed_id;
          })
        );
      }
    }
    console.log(followed);
    // followed = this.props.currUser[0].following;
    // unFollowed = users;

    this.forceUpdate();
  };

  remove = (array, element) => {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
    }
  };

  render() {
    console.log(this.props.relationships);
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
