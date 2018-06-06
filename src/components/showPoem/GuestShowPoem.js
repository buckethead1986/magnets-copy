import React from "react";
import GuestShowPoemCard from "./GuestShowPoemCard";

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
    return (
      <GuestShowPoemCard
        url={this.props.url}
        users={this.props.users}
        poem={this.state.poem}
        poems={this.props.poems}
        fetchPoems={this.props.fetchPoems}
        updateUsers={this.props.updateUsers}
        profileLink={this.props.profileLink}
      />
    );
  }
}

export default Poem;
