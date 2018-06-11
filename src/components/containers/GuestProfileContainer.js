import React from "react";
import Avatar from "material-ui/Avatar";
import { Grid, Row, Col } from "react-flexbox-grid";
import GuestPoemIndexCard from "../showPoem/GuestPoemIndexCard";
import Columns from "react-columns";

class ProfileContainer extends React.Component {
  welcomeMessage = () => {
    const user = this.props.store.getState().shownUser;
    let text = "";
    if (user.poems.length === 0) {
      text = `${user.username} has not created anything yet`;
    } else {
      text = `These are the poems created by ${user.username}`;
    }
    return text;
  };

  //does what the function name implies.
  renderShownUserAvatar = () => {
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
  };

  //depending on the shown user, updates rendered poem list
  renderShownUserPoems = () => {
    const shownUser = this.props.store.getState().shownUser;
    let mappedShownUserPoems;
    if (Object.keys(shownUser).length !== 0) {
      mappedShownUserPoems = shownUser.poems.map((poem, index) => {
        return (
          <Col key={index}>
            <GuestPoemIndexCard
              url={this.props.url}
              currUser={this.props.currUser}
              poem={poem}
              users={this.props.users}
              guestShowPoemLink={this.props.guestShowPoemLink}
            />
            <br />
          </Col>
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
