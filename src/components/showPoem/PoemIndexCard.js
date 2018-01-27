import React from "react";
import "../../App.css";
import PoemIndexBox from "./PoemIndexBox";
import IconButton from "material-ui/IconButton";
import StarBorder from "material-ui/svg-icons/toggle/star-border";
import Star from "material-ui/svg-icons/toggle/star";
import Favorite from "material-ui/svg-icons/action/favorite";
import FavoriteBorder from "material-ui/svg-icons/action/favorite-border";
import AccountBox from "material-ui/svg-icons/action/account-box";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

let styles = {
  width: window.innerWidth / 4 - 20,
  height: window.innerWidth / 4 * 0.8 - 16,
  // width: 500,
  // height: 398,
  marginLeft: 6,
  // marginRight: 4,
  // marginLeft: window.innerWidth / 2 - 250,
  // marginRight: window.innerWidth / 2 - 250,
  border: "solid",
  position: "relative"
};

class Poem extends React.Component {
  constructor() {
    super();

    this.state = {
      poem: {},
      // expanded: false,
      followed: false,
      favorite: false,
      relationships: []
    };
  }
  //
  // handleExpandChange = expanded => {
  //   this.setState({ expanded: expanded });
  // };
  //
  // handleToggle = (event, toggle) => {
  //   this.setState({ expanded: toggle });
  // };

  // componentDidMount() {
  //   const id = window.location.href.split("/");
  //   const thisPoemId = id[id.length - 1];
  //   fetch(`${this.props.url}/poems/${thisPoemId}`)
  //     .then(res => res.json())
  //     .then(json =>
  //       this.setState({
  //         poem: json,
  //         relationships: this.props.relationships
  //       })
  //     );
  // }

  componentDidMount() {
    this.setState(
      {
        poem: this.props.poems,
        relationships: this.props.relationships,
        followed: false
      },
      () => this.checkFollowed()
    );
  }

  checkFollowed = () => {
    const relationships = this.state.relationships;
    relationships.forEach(relationship => {
      if (
        relationship.follower_id === this.props.currUser.id &&
        relationship.followed_id === this.state.poem.user_id
      ) {
        this.setState({
          followed: true
        });
      }
    });
    // const relations = relationships.filter(relationship => {
    //   return (
    //     relationship.follower_id === this.props.currUser.id &&
    //     relationship.followed_id === this.props.poems.user_id
    //   );
    // });
    // if (relations.length !== 0) {
    //   this.setState(
    //     {
    //       followed: true
    //     }
    //     // () => console.log(this.state)
    //   );
    // }
  };

  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps);
    // const relationships = nextProps.relationships;
    // console.log(relationships);
    this.setState(
      {
        poem: nextProps.poems,
        relationships: nextProps.relationships,
        followed: false
      },
      () => this.checkFollowed()
    );

    // this.checkFollowed(relationships);
    // relationships.filter(relationship => {
    //   if (
    //     relationship.follower_id === nextProps.currUser.id &&
    //     relationship.followed_id === this.state.poem.user_id
    //   ) {
    //     this.setState({
    //       poem: nextProps.poems,
    //       followed: true,
    //       relationships: nextProps.relationships
    //     });
    //   }

    // });
  }

  // post request to follow a user
  // followUser = () => {
  //   const headers = {
  //     Accept: "application/json",
  //     "Content-Type": "application/json"
  //   };
  //   fetch(`${this.props.url}/relationships`, {
  //     method: "POST",
  //     headers: headers,
  //     body: JSON.stringify({
  //       follower_id: this.props.currUser.id,
  //       followed_id: this.state.poem.user_id
  //     })
  //   });
  //   this.changeFollowed();
  // };
  //
  // unFollowUser = relationships => {
  //   const relationshipId = relationships.filter(relationship => {
  //     return (
  //       relationship.follower_id === this.props.currUser.id &&
  //       relationship.followed_id === this.state.poem.user_id
  //     );
  //   })[0].id;
  //   const headers = {
  //     Accept: "application/json",
  //     "Content-Type": "application/json"
  //   };
  //   fetch(`${this.props.url}/relationships/${relationshipId}`, {
  //     method: "DELETE",
  //     headers: headers
  //   });
  //   this.changeFollowed();
  // };

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
        <PoemIndexBox
          title={word[1]}
          left={word[2]}
          top={word[3] - 4}
          width={styles.width}
          height={styles.height}
          // divWidth={window.innerWidth}
          // divHeight={window.innerHeight}
        />
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

  favoritePoem = () => {
    console.log("favorite poem");
    this.setState(
      prevState => {
        return { favorite: !prevState.favorite };
      },
      () => console.log(this.state.favorite)
    );
  };

  changeFollowState = () => {
    this.setState(
      prevState => {
        return { followed: !prevState.followed };
      },
      () => console.log(this.state.followed)
    );
  };

  followUser = () => {
    this.props.followUser(this.props.currUser.id, this.state.poem.user_id);
    this.changeFollowState();
  };

  unFollowUser = () => {
    this.props.unFollowUser(this.props.currUser.id, this.state.poem.user_id);
    this.changeFollowState();
  };

  // handleExpand = () => {
  //   console.log("clicked");
  //   this.setState(prevState => {
  //     return { expanded: !prevState.expanded };
  //   }, () => this.state.expanded);
  // };

  //poem splits the content of the poem into useable parts (each word is posted to the api as 'id/word/x-coord/y-coord' in one string with | between words)
  //poemWords returns the undraggable boxes with the correct coordinates
  //poemAuthor returns the Author of the poem
  //humanReadablePoem returns a string of the poem as human readable text.
  render() {
    // console.log(this.props);
    let poem;
    let poemWords;
    let poemAuthor = [];
    let humanReadablePoem = [];
    let shortHumanReadablePoem;
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
      if (humanReadablePoem.length < 40) {
        shortHumanReadablePoem = humanReadablePoem.padEnd(40, " ");
      } else {
        shortHumanReadablePoem = `${humanReadablePoem.slice(0, 40)}...`;
      }
    }
    return (
      <Card
        onExpandChange={() =>
          this.setState(
            prevState => {
              return { expanded: !prevState.expanded };
            },
            () => console.log("hey")
          )}
      >
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

        <CardActions>
          <IconButton>
            {this.state.favorite ? (
              <Star onClick={this.favoritePoem} color="red" />
            ) : (
              <StarBorder onClick={this.favoritePoem} color="black" />
            )}
          </IconButton>
          <IconButton>
            {this.state.followed ? (
              <AccountBox onClick={this.unFollowUser} color="blue" />
            ) : (
              <AccountBox onClick={this.followUser} color="black" />
            )}
          </IconButton>

          <IconButton disabled={true}>
            <FavoriteBorder onClick={this.favoriteUser} color="red" />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default Poem;
