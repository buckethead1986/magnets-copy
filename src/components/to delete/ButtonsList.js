import React from "react";
import Paper from "material-ui/Paper";
import Subheader from "material-ui/Subheader";
import { List, ListItem } from "material-ui/List";
import ActionGrade from "material-ui/svg-icons/action/grade";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";

const styles = {
  width: 250,
  marginTop: 20,
  marginLeft: 100,
  maxHeight: window.innerHeight - 100,
  overflow: "auto",
  float: "right"
};

class ButtonsList extends React.Component {
  render() {
    return (
      <Paper style={styles}>
        <List>
          <Subheader inset={true}>Followed</Subheader>
        </List>
        <Divider inset={true} />
        <List>
          <Subheader inset={true}>Unfollowed</Subheader>
        </List>
      </Paper>
    );
  }
}

export default ButtonsList;
