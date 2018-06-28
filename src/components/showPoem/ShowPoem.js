import React from "react";
import ShowCard from "./ShowCard";

class ShowPoem extends React.Component {
  constructor() {
    super();

    this.state = {
      poem: []
    };
  }

  componentDidMount() {
    const id = parseInt(this.props.match.params.id, 10);
    fetch(`${this.props.url}/poems/${id}`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          poem: json
        })
      );
  }

  //renders specific poem card for the poem show page
  render() {
    if (this.props.currUser.length !== 0) {
      return (
        <ShowCard
          indexCard={false}
          url={this.props.url}
          users={this.props.users}
          poem={this.state.poem}
          poems={this.props.poems}
          currUser={this.props.currUser}
          showPoemsLink={this.props.showPoemsLink}
          fetchPoems={this.props.fetchPoems}
          relationships={this.props.relationships}
          favorites={this.props.favorites}
          favoritePoem={this.props.favoritePoem}
          followUser={this.props.followUser}
          unFollowUser={this.props.unFollowUser}
          unFavoritePoem={this.props.unFavoritePoem}
          updateUsers={this.props.updateUsers}
        />
      );
    } else {
      return (
        <ShowCard
          indexCard={false}
          url={this.props.url}
          users={this.props.users}
          poem={this.state.poem}
          poems={this.props.poems}
          currUser={this.props.currUser}
          fetchPoems={this.props.fetchPoems}
        />
      );
    }
  }
}

export default ShowPoem;
