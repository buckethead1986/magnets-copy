import React from "react";
import "../../App.css";
import ShowBox from "../Custom Drag Layer/ShowBox";

import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

const styles = {
  width: 500,
  height: 398,
  marginLeft: window.innerWidth / 2 - 250,
  marginRight: window.innerWidth / 2 - 250,
  border: "solid",
  position: "relative"
};

class Poem extends React.Component {
  constructor() {
    super();

    this.state = {
      poem: {},
      followed: false,
      relationships: []
    };
  }

  componentDidMount() {
    console.log(this.props);
    const id = window.location.href.split("/");
    const thisPoemId = id[id.length - 1];
    fetch(`${this.props.url}/poems/${thisPoemId}`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          poem: json,
          relationships: this.props.relationships
        })
      );
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const users = nextProps.users;
    users.forEach(user => {
      user.followers.forEach(follower => {
        console.log(follower.id, nextProps.currUser.id);
        if (follower.id === nextProps.currUser.id) {
          this.setState(
            {
              followed: true,
              relationships: nextProps.relationships
            },
            () => console.log(this.state.relationships)
          );
        }
      });
    });
  }

  //post request to follow a user
  followUser = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    fetch(`${this.props.url}/relationships`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        follower_id: this.props.currUser.id,
        followed_id: this.state.poem.user_id
      })
    });
    this.changeFollowed();
  };

  unFollowUser = relationships => {
    const relationshipId = relationships.filter(relationship => {
      return (
        relationship.follower_id === this.props.currUser.id &&
        relationship.followed_id === this.state.poem.user_id
      );
    })[0].id;
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    fetch(`${this.props.url}/relationships/${relationshipId}`, {
      method: "DELETE",
      headers: headers
    });
    this.changeFollowed();
  };

  fetchRelationships = () => {
    fetch(`${this.props.url}/relationships`)
      .then(res => res.json())
      .then(json => this.unFollowUser(json));
  };

  changeFollowed = () => {
    this.setState(prevState => {
      return {
        followed: !prevState.followed
      };
    });
  };

  renderBox = (word, index) => {
    return (
      <div key={index}>
        <ShowBox title={word[1]} left={word[2]} top={word[3] - 4} />
      </div>
    );
  };

  followedUnfollowed = poemAuthor => {
    if (this.state.followed === true) {
      return (
        <FlatButton
          onClick={this.fetchRelationships}
          disabled={
            this.props.currUser.id === this.state.poem.user_id ? true : false
          }
          label={
            poemAuthor[0] !== undefined
              ? `Unfollow ${poemAuthor[0].username}`
              : "Disabled"
          }
        />
      );
    } else {
      return (
        <FlatButton
          onClick={this.followUser}
          disabled={
            this.props.currUser.id === this.state.poem.user_id ? true : false
          }
          label={
            poemAuthor[0] !== undefined
              ? `Follow ${poemAuthor[0].username}`
              : "Disabled"
          }
        />
      );
    }
  };

  //poem splits the content of the poem into useable parts (each word is posted to the api as 'id/word/x-coord/y-coord' in one string with | between words)
  //poemWords returns the undraggable boxes with the correct coordinates
  //poemAuthor returns the Author of the poem
  //humanReadablePoem returns a string of the poem as human readable text.
  render() {
    let poem;
    let poemWords;
    let poemAuthor = [];
    let humanReadablePoem = [];
    if (this.state.poem.content !== undefined) {
      poem = this.state.poem.content.split("|").map(word => {
        return word.split("/");
      });
      poemWords = poem.map((word, index) => {
        return this.renderBox(word, index);
      });
      poemAuthor = this.props.users.filter(poemAuthor => {
        return poemAuthor.id === this.state.poem.user_id;
      });
      humanReadablePoem = poem
        .map(word => {
          return word[1];
        })
        .join(" ");
    }
    return (
      <Card>
        <CardHeader
          title={
            poemAuthor[0] !== undefined
              ? `Author: ${poemAuthor[0].username}`
              : "Nobody"
          }
          subtitle="Subtitle"
          avatar="http://www.divebuddy.com/members/photos/pic_1_69507.jpg"
        />
        <div style={styles}>{poemWords}</div>
        <CardTitle title="Poem Text" subtitle={humanReadablePoem} />
        <CardActions>
          <FlatButton label="Favorite This Poem" />
          {this.followedUnfollowed(poemAuthor)}
        </CardActions>
      </Card>
    );
  }
}

export default Poem;
