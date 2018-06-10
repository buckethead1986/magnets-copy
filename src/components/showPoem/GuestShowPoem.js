import React from "react";
import GuestShowPoemCard from "./GuestShowPoemCard";
import ShowPoemCard from "./ShowPoemCard";

class Poem extends React.Component {
  constructor() {
    super();

    this.state = {
      poem: []
    };
  }

  componentDidMount() {
    const id = window.location.href.split("/");
    const thisPoemId = id[id.length - 1];
    fetch(`${this.props.url}/poems/${thisPoemId}`)
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
        <ShowPoemCard
          url={this.props.url}
          showPoemsLink={this.props.showPoemsLink}
          currUser={this.props.currUser}
          users={this.props.users}
          poem={this.state.poem}
          poems={this.props.poems}
          fetchPoems={this.props.fetchPoems}
          updateUsers={this.props.updateUsers}
          followUser={this.props.followUser}
          unFollowUser={this.props.unFollowUser}
          relationships={this.props.relationships}
          favoritePoem={this.props.favoritePoem}
          unFavoritePoem={this.props.unFavoritePoem}
          favorites={this.props.favorites}
          profileLink={this.props.profileLink}
        />
      );
    } else {
      return (
        <GuestShowPoemCard
          url={this.props.url}
          users={this.props.users}
          poem={this.state.poem}
          poems={this.props.poems}
          fetchPoems={this.props.fetchPoems}
          // updateUsers={this.props.updateUsers}
          profileLink={this.props.profileLink}
        />
      );
    }
  }
}

export default Poem;
