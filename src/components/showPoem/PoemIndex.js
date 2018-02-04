import React from "react";
import PoemIndexCard from "./PoemIndexCard";
import Columns from "react-columns";
import SelectField from "../selectField/SelectField";

class PoemIndex extends React.Component {
  constructor() {
    super();

    this.state = {
      filteredPoems: [],
      users: []
    };
  }
  componentWillMount() {
    this.setState({
      users: this.props.users,
      filteredPoems: this.props.poems
    });
  }

  //sets state of poems based on filtered users set in SelectField component. Defaults to all users' poems.
  filteredPoems = users => {
    let userArray = [];
    this.state.users.forEach(user => {
      if (users.includes(user.username)) {
        userArray.push(user.id);
      }
    });
    const filteredPoems = this.props.poems.filter(poem => {
      return userArray.includes(poem.user_id);
    });
    if (users.length === 0) {
      this.setState({
        filteredPoems: this.props.poems
      });
    } else {
      this.setState({
        filteredPoems: filteredPoems
      });
    }
  };

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
          />
          <br />
        </div>
      );
    });
    return (
      <div>
        <SelectField
          users={this.props.users}
          filteredPoems={this.filteredPoems}
        />
        <Columns columns={4}>{poems}</Columns>
      </div>
    );
  }
}

export default PoemIndex;
