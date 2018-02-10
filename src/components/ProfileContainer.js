import React from "react";
import UsersList from "./profile/UsersList";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import { Grid, Row, Col } from "react-flexbox-grid";
import PoemIndexCard from "./showPoem/PoemIndexCard";

class ProfileContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      poems: [],
      shownUser: ""
    };
  }

  componentWillMount() {
    console.log(
      "componentDidMount",
      this.props.store.getState().shownUser,
      this.props.currUser[0]
    );
    const user = this.props.store.getState().shownUser;
    console.log(this.props.store.getState().shownUser);
    this.setState(
      {
        poems: this.props.poems.filter(poem => {
          return poem.user_id === user.id;
        }),
        shownUser: user
      },
      () => console.log(this.state)
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    const user = this.props.store.getState().shownUser;
    if (this.state.shownUser[0] !== this.props.currUser[0]) {
      this.setState({
        poems: this.props.poems.filter(poem => {
          return poem.user_id === this.props.currUser[0].id;
        }),
        shownUser: this.props.users.filter(user => {
          return user.id === this.props.currUser[0].id;
        })
      });
    }
  }

  changeShownUser = id => {
    const shownUser = this.props.users.filter(user => {
      return user.id === id;
    })[0];
    console.log(shownUser);
    this.setState({
      poems: this.props.poems.filter(poem => {
        return poem.user_id === id;
      }),

      shownUser: this.props.users.filter(user => {
        return user.id === shownUser.id;
      })
    });
    this.props.store.dispatch({
      type: "CHANGE_SHOWN_USER",
      payload: shownUser
    });
  };

  welcomeMessage = () => {
    const user = this.props.store.getState().shownUser;
    let text = "";
    if (user.id === this.props.currUser[0].id) {
      text = `Welcome back ${user.username}! `;
      if (this.props.currUser[0].followers.length === 1) {
        text += `You have ${this.props.currUser[0].followers
          .length} user following you, `;
      } else {
        text += `You have ${this.props.currUser[0].followers
          .length} users following you, `;
      }
      if (this.state.poems.length === 1) {
        text += `and ${this.state.poems.length} poem created`;
      } else {
        text += `and ${this.state.poems.length} poems created`;
      }
    } else {
      text = `These are the poems created by ${user.username}`;
    }
    return text;
  };

  renderShownUserAvatar = () => {
    console.log(this.state.shownUser, this.props.currUser[0].id);
    if (
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

  renderShownUserPoems = () => {
    const poems = this.props.store
      .getState()
      .shownUser.poems.map((poem, index) => {
        return (
          <Col key={index}>
            <PoemIndexCard
              columns={4}
              showPoem={this.props.showPoem}
              url={this.props.url}
              currUser={this.props.currUser}
              users={this.props.users}
              poem={poem}
              followUser={this.props.followUser}
              unFollowUser={this.props.unFollowUser}
              relationships={this.props.relationships}
              favoritePoem={this.props.favoritePoem}
              unFavoritePoem={this.props.unFavoritePoem}
              favorites={this.props.favorites}
            />
            <br />
          </Col>
        );
      });
    return poems;
  };

  render() {
    return (
      <div>
        <div style={{ float: "left" }}>
          <UsersList
            users={this.props.users}
            relationships={this.props.relationships}
            currUser={this.props.currUser}
            showUser={this.props.showUser}
            changeShownUser={this.changeShownUser}
          />
        </div>
        <div>
          <Grid fluid>
            <Row>
              <Col>{this.renderShownUserAvatar()}</Col>
            </Row>
            <h4>{this.welcomeMessage()}</h4>
            <Row>{this.renderShownUserPoems()}</Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default ProfileContainer;
