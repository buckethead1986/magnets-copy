import React from "react";
import Avatar from "material-ui/Avatar";
import { Grid, Row, Col } from "react-flexbox-grid";
import GuestPoemIndexCard from "../showPoem/GuestPoemIndexCard";
import Columns from "react-columns";

class ProfileContainer extends React.Component {
  welcomeMessage = () => {
    const user = this.props.store.getState().shownUser;
    let text = "";
    if (
      this.props.currUser.length !== 0 &&
      user.id === this.props.currUser[0].id
    ) {
      text = `Welcome back ${user.username}! `;
      if (this.props.currUser[0].followers.length === 1) {
        text += `You have ${this.props.currUser[0].followers
          .length} user following you, `;
      } else {
        text += `You have ${this.props.currUser[0].followers
          .length} users following you, `;
      }
      if (user.poems.length === 1) {
        text += `and ${user.poems.length} poem created`;
      } else {
        text += `and ${user.poems.length} poems created`;
      }
    } else if (user.poems.length === 0) {
      text = `${user.username} has not created anything yet`;
    } else {
      text = `These are the poems created by ${user.username}`;
    }
    return text;
  };

  //does what the function name implies.
  renderShownUserAvatar = () => {
    if (
      this.props.currUser.length !== 0 &&
      this.props.store.getState().shownUser.id === this.props.currUser[0].id
    ) {
      return (
        <Avatar
          src={this.props.store.getState().image}
          size={200}
          style={{
            marginTop: 20,
            marginLeft: (window.innerWidth - 540) / 2
          }}
          onClick={() => this.props.changeProfileImageLink()}
        />
      );
    } else {
      return (
        <Avatar
          src={this.props.store.getState().shownUser.image}
          size={200}
          style={{
            marginTop: 20,
            marginLeft: (window.innerWidth - 540) / 2
          }}
        />
      );
    }
  };

  //depending on the shown user, updates rendered poem list
  renderShownUserPoems = () => {
    const shownUser = this.props.store.getState().shownUser;
    let mappedShownUserPoems;
    if (Object.keys(shownUser).length !== 0) {
      mappedShownUserPoems = shownUser.poems.map((poem, index) => {
        return (
          <div key={index}>
            <GuestPoemIndexCard
              showPoemLink={this.props.showPoemLink}
              url={this.props.url}
              currUser={this.props.currUser}
              users={this.props.users}
              fetchPoems={this.props.fetchPoems}
              updateUsers={this.props.updateUsers}
              poem={poem}
              followUser={this.props.followUser}
              unFollowUser={this.props.unFollowUser}
              relationships={this.props.relationships}
              favoritePoem={this.props.favoritePoem}
              unFavoritePoem={this.props.unFavoritePoem}
              favorites={this.props.favorites}
              guestShowPoemLink={this.props.guestShowPoemLink}
            />
            <br />
          </div>
        );
      });
    } else {
      mappedShownUserPoems = "";
    }
    return <Columns columns={3}>{mappedShownUserPoems}</Columns>;
  };

  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col>{this.renderShownUserAvatar()}</Col>
          </Row>
          <h4>{this.welcomeMessage()}</h4>
        </Grid>
        {this.renderShownUserPoems()}
      </div>
    );
  }
}

export default ProfileContainer;
