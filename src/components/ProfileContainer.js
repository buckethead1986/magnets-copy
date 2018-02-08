import React from "react";
import UsersList from "./profile/UsersList";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";

class ProfileContainer extends React.Component {
  render() {
    console.log(this.props.store.getState().image);
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <UsersList
          users={this.props.users}
          relationships={this.props.relationships}
          currUser={this.props.currUser}
        />

        <div>
          <Avatar
            src={this.props.store.getState().image}
            size={200}
            style={{
              marginTop: 20,
              marginLeft: (window.innerWidth - 540) / 2
            }}
            onClick={() => this.props.changeProfileImageLink()}
          />
        </div>
      </div>
    );
  }
}

export default ProfileContainer;
