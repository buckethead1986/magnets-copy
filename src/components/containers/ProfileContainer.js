import React from "react";
import Avatar from "material-ui/Avatar";
import { Grid, Row, Col } from "react-flexbox-grid";
import UsersList from "../profile/UsersList";
import PoemIndexCard from "../showPoem/PoemIndexCard";

class ProfileContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      poems: [],
      shownUser: ""
    };
  }

  //loads your avatar and poems by default
  componentWillMount() {
    const user = this.props.store.getState().shownUser;
    this.setState({
      poems: this.props.poems.filter(poem => {
        return poem.user_id === user.id;
      }),
      shownUser: user
    });
  }

  //keeps the user being shown constant, if you navigate to a poem and back
  //(click on a user, click a poem, click back, stays on that user, doesnt default back to your profile)
  componentWillReceiveProps(nextProps) {
    if (
      this.state.shownUser[0] !== this.props.currUser[0] ||
      this.props.poems !== nextProps.poems
    ) {
      this.setState({
        poems: nextProps.poems.filter(poem => {
          return poem.user_id === this.props.currUser[0].id;
        }),
        shownUser: nextProps.users.filter(user => {
          return user.id === this.props.currUser[0].id;
        })[0]
      });
    }
  }

  //updates store and current state to maintain the same user being shown
  // changeShownUser = id => {
  //   const shownUser = this.props.users.filter(user => {
  //     return user.id === id;
  //   })[0];
  //   this.setState({
  //     poems: this.props.poems.filter(poem => {
  //       return poem.user_id === id;
  //     }),
  //     shownUser: this.props.users.filter(user => {
  //       return user.id === shownUser.id;
  //     })[0]
  //   });
  //   this.props.store.dispatch({
  //     type: "CHANGE_SHOWN_USER",
  //     payload: shownUser
  //   });
  // };

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

  //does what the function name implies.
  renderShownUserAvatar = () => {
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

  //depending on the shown user, updates rendered poem list
  renderShownUserPoems = () => {
    const shownUser = this.props.store.getState().shownUser;
    let mappedShownUserPoems;
    if (Object.keys(shownUser).length !== 0) {
      mappedShownUserPoems = shownUser.poems.map((poem, index) => {
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
    } else {
      mappedShownUserPoems = "";
    }
    return mappedShownUserPoems;
  };

  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col>{this.renderShownUserAvatar()}</Col>
          </Row>
          <h4>{this.welcomeMessage()}</h4>
          <Row>{this.renderShownUserPoems()}</Row>
        </Grid>
      </div>
    );
  }
}

export default ProfileContainer;
