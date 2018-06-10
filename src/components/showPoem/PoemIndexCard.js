import React from "react";
import PoemIndexBox from "./PoemIndexBox";
import IconButton from "material-ui/IconButton";
import StarBorder from "material-ui/svg-icons/toggle/star-border";
import Star from "material-ui/svg-icons/toggle/star";
import AccountBox from "material-ui/svg-icons/action/account-box";
import { Card, CardActions, CardHeader } from "material-ui/Card";

let styles = {
  width: window.innerWidth / 4 - 20,
  height: window.innerWidth / 4 * 0.8 - 16,
  marginLeft: 6,
  marginRight: 6,
  border: "solid",
  position: "relative"
};

//specific poem card, has favorite/unfavorite and follow/unfollow methods, updates state and redux store on change
class Poem extends React.Component {
  constructor() {
    super();

    this.state = {
      poem: {},
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
        this.checkFavorite(this.props.favorites);
      }
    );
  }

  //updates other poemIndexCards to reflect the new followed/following state when you follow a user
  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        poem: nextProps.poem,
        relationships: nextProps.relationships,
        followed: false,
        favorite: false
      },
      () => {
        this.checkFollowed();
        this.checkFavorite(nextProps.favorites);
      }
    );
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

  checkFavorite = favorites => {
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

  //followedUnfollowed and favoriteUnfavorite modify the rendered components depending on the state of 'followed' and 'favorite'
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
  render() {
    let poem;
    let poemWords;
    let poemAuthor = [];
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
    }
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
        <div
          onClick={() => this.props.showPoemLink(this.props.poem.id)}
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
