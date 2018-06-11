import React from "react";
import { Card, CardActions, CardHeader, CardTitle } from "material-ui/Card";
import GuestShowBox from "./GuestShowBox";
import AccountBox from "material-ui/svg-icons/action/account-box";
import IconButton from "material-ui/IconButton";
import StarBorder from "material-ui/svg-icons/toggle/star-border";
import Star from "material-ui/svg-icons/toggle/star";
import Clear from "material-ui/svg-icons/content/clear";

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
      favorite: false,
      relationships: []
    };
  }

  //updates other poemIndexCards to reflect the new followed/following state when you follow a user
  componentWillReceiveProps(nextProps) {
    if (this.props.currUser.length !== 0) {
      const favorite = nextProps.favorites.filter(poem => {
        return (
          poem.poem_id === nextProps.poem.id &&
          poem.user_id === nextProps.currUser[0].id
        );
      });
      if (favorite.length !== 0) {
        this.setState(
          {
            poem: nextProps.poem,
            relationships: nextProps.relationships,
            followed: false,
            favorite: true
          },
          () => this.checkFollowed()
        );
      } else {
        this.setState(
          {
            poem: nextProps.poem,
            relationships: nextProps.relationships,
            followed: false,
            favorite: false
          },
          () => this.checkFollowed()
        );
      }
    }
  }

  //checkFollowed and checkFavorite iterate through favorites and relationships arrays and update state if a match is found
  checkFollowed = () => {
    const relationships = this.state.relationships;
    relationships.forEach(relationship => {
      if (
        relationship.follower_id === this.props.currUser[0].id &&
        relationship.followed_id === this.state.poem.user_id
      ) {
        this.setState({
          followed: true
        });
      }
    });
  };

  checkFavorite = () => {
    const favorites = this.state.favorites;
    favorites.forEach(favorite => {
      if (
        favorite.user_id === this.props.currUser[0].id &&
        favorite.poem_id === this.state.poem.id
      ) {
        this.setState({
          favorite: true
        });
      }
    });
  };

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
        follower_id: this.props.currUser[0].id,
        followed_id: this.props.poem.user_id
      })
    });
    this.changeFollowed();
  };

  unFollowUser = relationships => {
    const relationshipId = relationships.filter(relationship => {
      return (
        relationship.follower_id === this.props.currUser[0].id &&
        relationship.followed_id === this.props.poem.user_id
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

  //followedUnfollowed modifies the rendered components depending on the state of 'followed'
  followedUnfollowed = poemAuthor => {
    if (
      poemAuthor[0] !== undefined &&
      this.props.currUser[0].id !== this.state.poem.user_id
    ) {
      if (this.state.followed) {
        return (
          <IconButton
            tooltip={`Unfollow ${poemAuthor[0].username}`}
            tooltipPosition="bottom-center"
          >
            <AccountBox onClick={this.unFollowUser} color="#00BCD4" />
          </IconButton>
        );
      } else {
        return (
          <IconButton
            tooltip={`Follow ${poemAuthor[0].username}`}
            tooltipPosition="bottom-center"
          >
            <AccountBox onClick={this.followUser} color="black" />
          </IconButton>
        );
      }
    } else {
      return (
        <IconButton tooltip={`This is you`} tooltipPosition="bottom-center">
          <AccountBox color="grey" />
        </IconButton>
      );
    }
  };

  //favoriteUnfavorite modifies the rendered components depending on the state of 'favorite'
  favoriteUnfavorite = () => {
    if (this.state.favorite) {
      return (
        <IconButton
          tooltip={`Remove poem from favorites`}
          tooltipPosition="bottom-center"
        >
          <Star onClick={this.unFavoritePoem} color="red" />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          tooltip={`Add poem to favorites`}
          tooltipPosition="bottom-center"
        >
          <StarBorder onClick={this.favoritePoem} color="black" />
        </IconButton>
      );
    }
  };

  //changeFavoriteState and //changeFollowState, pretty self-explanatory. They toggle the associated state
  changeFavoriteState = () => {
    this.setState(prevState => {
      return { favorite: !prevState.favorite };
    });
  };

  changeFollowState = () => {
    this.setState(prevState => {
      return { followed: !prevState.followed };
    });
  };

  //call passed down function to follow/favorite poems/users, and then update the current state
  favoritePoem = () => {
    this.props.favoritePoem(this.props.currUser[0].id, this.props.poem.id);
    this.changeFavoriteState();
  };

  unFavoritePoem = () => {
    this.props.unFavoritePoem(this.props.currUser[0].id, this.props.poem.id);
    this.changeFavoriteState();
  };

  followUser = () => {
    this.props.followUser(this.props.currUser[0].id, this.state.poem.user_id);
    this.changeFollowState();
  };

  unFollowUser = () => {
    this.props.unFollowUser(this.props.currUser[0].id, this.state.poem.user_id);
    this.changeFollowState();
  };

  deleteable = () => {
    if (this.props.currUser[0].id === this.props.poem.user_id) {
      return (
        <IconButton tooltip={`Delete Poem`} tooltipPosition="bottom-center">
          <Clear onClick={this.deletePoem} />
        </IconButton>
      );
    }
  };

  deletePoem = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    fetch(`${this.props.url}/poems/${this.props.poem.id}`, {
      method: "DELETE",
      headers: headers
    })
      .then(() => this.props.fetchPoems())
      .then(() => this.props.updateUsers());
    // .then(() => this.props.store.dispatch({type: 'CHANGE_SHOWN_USER', payload: this.props.}))
  };

  renderBox = (word, index) => {
    return (
      <div key={index}>
        <GuestShowBox
          title={word[1]}
          left={word[2]}
          top={word[3] - 4}
          width={styles.width}
          height={styles.height}
        />
      </div>
    );
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
    if (this.props.poem.content !== undefined) {
      poem = this.props.poem.content.split("|").map(word => {
        return word.split("/");
      });
      poemWords = poem.map((word, index) => {
        return this.renderBox(word, index);
      });
      poemAuthor = this.props.users.filter(poemAuthor => {
        return poemAuthor.id === this.props.poem.user_id;
      });
      humanReadablePoem = poem
        .map(word => {
          return word[1];
        })
        .join(" ");
    }
    if (this.props.currUser.length !== 0) {
      return (
        <Card>
          <CardHeader
            title={
              poemAuthor[0] !== undefined
                ? `Author: ${poemAuthor[0].username}`
                : "Nobody"
            }
            avatar={
              poemAuthor[0] !== undefined
                ? poemAuthor[0].image
                : this.props.defaultImage
            }
          />
          <div style={styles} onClick={() => window.history.back()}>
            {poemWords}
          </div>
          <CardTitle title="Poem Text" subtitle={humanReadablePoem} />
          <CardActions>
            {this.favoriteUnfavorite()}
            {this.followedUnfollowed(poemAuthor)}
            {this.deleteable()}
          </CardActions>
        </Card>
      );
    } else {
      return (
        <Card>
          <CardHeader
            title={
              poemAuthor[0] !== undefined
                ? `Author: ${poemAuthor[0].username}`
                : "Nobody"
            }
            avatar={
              poemAuthor[0] !== undefined
                ? poemAuthor[0].image
                : this.props.defaultImage
            }
          />
          <div style={styles} onClick={() => window.history.back()}>
            {poemWords}
          </div>
          <CardTitle title="Poem Text" subtitle={humanReadablePoem} />
          <CardActions />
        </Card>
      );
    }
  }
}

export default Poem;
