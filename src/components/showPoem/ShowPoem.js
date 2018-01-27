import React from "react";
import "../../App.css";
import ShowPoemCard from "./ShowPoemCard";

class Poem extends React.Component {
  constructor() {
    super();

    this.state = {
      poem: []
      // relationship: []
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
          // relationships: this.props.relationships
        })
      );
  }

  render() {
    // const id = window.location.href.split("/");
    // const thisPoemId = id[id.length - 1];
    // const poem = this.props.poems.filter(poem => {
    //   return poem.id === parseInt(thisPoemId);
    // })[0];
    return (
      <ShowPoemCard
        url={this.props.url}
        currUser={this.props.currUser}
        users={this.props.users}
        poem={this.state.poem}
        relationships={this.props.relationships}
      />
    );
  }
}

export default Poem;
