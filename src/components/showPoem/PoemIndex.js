import React from "react";
import PoemIndexCard from "./PoemIndexCard";
import Columns from "react-columns";
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
  }

  //updates list of favorited poems, users and poems for other users concurrent creations
  componentWillReceiveProps(nextProps) {
    if (this.props.poems !== nextProps.poems) {
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
      return (
        <div key={index}>
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
            defaultImage={this.defaultImage}
          />
          <br />
        </div>
      );
    });
    const text =
      "Scroll through all the poems! Filter by the authors of your choice";
    const text2 = "Add poems to your list of Favorites, or Follow another user";
    return (
      <div>
        <h4 align="center">{text}</h4>
        <h4 align="center">{text2}</h4>
        <SelectUsersDropdown
          users={this.props.users}
          filteredPoems={this.filteredPoems}
          favoritedPoems={this.state.favoritedPoems}
        />
        <Columns columns={4}>{poems}</Columns>
      </div>
    );
  }
}

export default PoemIndex;
