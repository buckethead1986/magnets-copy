import React from "react";
import Columns from "react-columns";
import PoemIndexCard from "./PoemIndexCard";
import SelectUsersDropdown from "../selectUserDropdown/SelectUsersDropdown";

//shows all poems as cards, includes favorite and following actions.
class PoemIndex extends React.Component {
  constructor() {
    super();

    this.state = {
      filteredPoems: [],
      users: [],
      favoritedPoems: [],
      listOfFilteredUsers: []
    };
  }

  componentWillMount() {
    if (this.props.currUser.length !== 0) {
      const favoritedPoems = this.props.poems.filter(poem => {
        return poem.favorited_by.some(user => {
          return user.id === this.props.currUser[0].id;
        });
      });
      this.setState({
        users: this.props.users,
        filteredPoems: this.props.poems,
        favoritedPoems: favoritedPoems
      });
    } else {
      this.setState({
        users: this.props.users,
        filteredPoems: this.props.poems
      });
    }
  }

  //updates list of favorited poems, users and poems for other users concurrent creations
  componentWillReceiveProps(nextProps) {
    if (
      this.props.currUser.length !== 0 &&
      this.props.poems !== nextProps.poems
    ) {
      const favoritedPoems = nextProps.poems.filter(poem => {
        return poem.favorited_by.some(user => {
          return user.id === this.props.currUser[0].id;
        });
      });
      this.setState(
        {
          users: nextProps.users,
          filteredPoems: nextProps.poems,
          favoritedPoems: favoritedPoems
        },
        () => this.filterPoems()
      );
    } else if (this.props.poems !== nextProps.poems) {
      this.setState(
        {
          users: nextProps.users,
          filteredPoems: nextProps.poems
        },
        () => this.filterPoems()
      );
    }
  }

  //sets state based on selection dropdown values in SelectUsersDropdown
  filteredPoems = users => {
    this.setState(
      {
        listOfFilteredUsers: users
      },
      () => this.filterPoems()
    );
  };

  //sets state of poems based on filtered users set in SelectUsersDropdown component. Defaults to all users' poems.
  filterPoems = () => {
    let userArray = [];
    this.state.users.forEach(user => {
      if (this.state.listOfFilteredUsers.includes(user.username)) {
        userArray.push(user.id);
      }
    });
    let filteredPoems;
    if (this.state.listOfFilteredUsers.includes("Favorites")) {
      filteredPoems = this.state.favoritedPoems.filter(poem => {
        return userArray.includes(poem.user_id);
      });
    } else {
      filteredPoems = this.props.poems.filter(poem => {
        return userArray.includes(poem.user_id);
      });
    }
    if (this.state.listOfFilteredUsers.length === 0) {
      this.setState({
        filteredPoems: this.props.poems
      });
    } else if (
      this.state.listOfFilteredUsers.length === 1 &&
      this.state.listOfFilteredUsers.includes("Favorites")
    ) {
      this.setState({
        filteredPoems: this.state.favoritedPoems
      });
    } else {
      this.setState({
        filteredPoems: filteredPoems
      });
    }
  };

  //renders all poem cards
  render() {
    const poems = this.state.filteredPoems.map((poem, index) => {
      if (this.props.currUser.length !== 0) {
        return (
          <div key={index}>
            <PoemIndexCard
              showPoemLink={this.props.showPoemLink}
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
              defaultImage={this.defaultImage}
            />
            <br />
          </div>
        );
      } else {
        return (
          <div key={index}>
            <PoemIndexCard
              guestShowPoemLink={this.props.guestShowPoemLink}
              url={this.props.url}
              currUser={this.props.currUser}
              users={this.props.users}
              poem={poem}
            />
            <br />
          </div>
        );
      }
    });
    let text;
    if (this.props.currUser.length !== 0) {
      text =
        "Scroll through all the poems! Filter by the users and/or favorites (you can select multiple) of your choice";
    } else {
      text =
        "Scroll through all the poems! Filter by the users (you can select multiple) of your choice";
    }
    return (
      <div>
        <h3 align="center">{text}</h3>
        <SelectUsersDropdown
          users={this.props.users}
          filteredPoems={this.filteredPoems}
          favoritedPoems={this.state.favoritedPoems}
          currUser={this.props.currUser}
        />
        <Columns columns={3}>{poems}</Columns>
      </div>
    );
  }
}

export default PoemIndex;
