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
  marginLeft: 6,
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
      relationships: [],
      favorites: []
    };
  }

  componentDidMount() {
    this.setState(
      {
        poem: this.props.poem,
        relationships: this.props.relationships,
        favorites: this.props.favorites
      },
      () => {
        this.checkFollowed();
        this.checkFavorite();
      }
    );
  }

  //checkFollowed and checkFavorite iterate through favorites and relationships arrays and update state if a match is found
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
  };

  checkFavorite = () => {
    const favorites = this.state.favorites;
    favorites.forEach(favorite => {
      console.log(favorite, this.props.currUser.id, this.state.poem.id);
      if (
        favorite.user_id === this.props.currUser.id &&
        favorite.poem_id === this.state.poem.id
      ) {
        this.setState({
          favorite: true
        });
      }
    });
  };

  //updates other poemIndexCards to reflect the new followed/following state when you follow a user
  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        poem: nextProps.poem,
        relationships: nextProps.relationships,
        followed: false
      },
      () => this.checkFollowed()
    );
  }

  //followedUnfollowed and favoriteUnfavorite modify the rendered components depending on the state of 'followed' and 'favorite'
  followedUnfollowed = poemAuthor => {
    if (
      poemAuthor[0] !== undefined &&
      this.props.currUser.id !== this.state.poem.user_id
    ) {
      if (this.state.followed) {
        return (
          <IconButton
            tooltip={`Unfollow ${poemAuthor[0].username}`}
            tooltipPosition="bottom-center"
          >
            <AccountBox onClick={this.unFollowUser} color="blue" />
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

  //call passed down function to follow/favorite poems/users, and then update the current state
  favoritePoem = () => {
    this.props.favoritePoem(this.props.currUser.id, this.props.poem.id);
    this.changeFavoriteState();
  };

  unFavoritePoem = () => {
    this.props.unFavoritePoem(this.props.currUser.id, this.props.poem.id);
    this.changeFavoriteState();
  };

  followUser = () => {
    this.props.followUser(this.props.currUser.id, this.state.poem.user_id);
    this.changeFollowState();
  };

  unFollowUser = () => {
    this.props.unFollowUser(this.props.currUser.id, this.state.poem.user_id);
    this.changeFollowState();
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
        <div
          onClick={() => this.props.showPoem(this.props.poem.id)}
          style={styles}
        >
          {poemWords}
        </div>
        <CardActions>
          {this.favoriteUnfavorite()}
          {this.followedUnfollowed(poemAuthor)}
        </CardActions>
      </Card>
    );
  }
}

export default Poem;
