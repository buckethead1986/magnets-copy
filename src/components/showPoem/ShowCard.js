import React from "react";
import { Card, CardActions, CardHeader, CardTitle } from "material-ui/Card";
import ShownPoemWordBox from "./ShownPoemWordBox";
import AccountBox from "material-ui/svg-icons/action/account-box";
import IconButton from "material-ui/IconButton";
import StarBorder from "material-ui/svg-icons/toggle/star-border";
import Star from "material-ui/svg-icons/toggle/star";
import Clear from "material-ui/svg-icons/content/clear";

const styles = {
  indexCard: {
    height: 550 * (window.innerWidth / 1000) * (1 / 3), //maintains relative size of poem box. relative proportions of 550 based on new window width to the original width of 1000, scaled 1/3 because of the 3 column layout
    width: window.innerWidth * (1 / 3), //really its 1000 * window.innerWidth/1000 * (1/3), but it cancels
    marginLeft: 6,
    marginRight: 6,
    position: "relative",
    borderRadius: "50px 50px 50px 50px",
    border: "#2196F3",
    borderTopStyle: "solid",
    borderBottomStyle: "solid"
  },
  showCard: {
    width: 1000,
    height: 550,
    position: "relative",
    borderRadius: "50px 50px 50px 50px",
    border: "#2196F3",
    borderTopStyle: "solid",
    borderBottomStyle: "solid"
  }
};

//specific poem card, has favorite/unfavorite and follow/unfollow methods, updates state and redux store on change
//this.props.indexCard is a boolean, true = to be rendered in the poemIndex list, false = single poem render. Slight differences in parameters and style
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
    if (this.props.indexCard) {
      if (this.props.currUser.length !== 0) {
        this.setState(
          {
            poem: this.props.poem,
            relationships: this.props.relationships,
            favorites: this.props.favorites
          },
          () => {
            this.checkFollowed(this.props.relationships);
            this.checkFavorite(this.props.favorites);
          }
        );
      } else {
        this.setState({ poem: this.props.poem });
      }
    }
  }

  //updates other poemIndexCards to reflect the new followed/following state when you follow a user
  componentWillReceiveProps(nextProps) {
    if (this.props.indexCard) {
      if (this.props.currUser.length !== 0) {
        this.setState(
          {
            poem: nextProps.poem,
            relationships: nextProps.relationships,
            followed: false,
            favorite: false
          },
          () => {
            this.checkFollowed(nextProps.relationships);
            this.checkFavorite(nextProps.favorites);
          }
        );
      } else {
        this.setState({ poem: nextProps.poem });
      }
    } else {
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
            () => this.checkFollowed(nextProps.relationships)
          );
        } else {
          this.setState(
            {
              poem: nextProps.poem,
              relationships: nextProps.relationships,
              followed: false,
              favorite: false
            },
            () => this.checkFollowed(nextProps.relationships)
          );
        }
      }
    }
  }

  //checkFollowed and checkFavorite iterate through favorites and relationships arrays and update state if a match is found
  checkFollowed = relationships => {
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
            tooltipPosition="bottom-right"
          >
            <AccountBox onClick={this.unFollowUser} color="#00BCD4" />
          </IconButton>
        );
      } else {
        return (
          <IconButton
            tooltip={`Follow ${poemAuthor[0].username}`}
            tooltipPosition="bottom-right"
          >
            <AccountBox onClick={this.followUser} color="black" />
          </IconButton>
        );
      }
    } else {
      return (
        <IconButton tooltip={`This is you`} tooltipPosition="bottom-right">
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
          tooltipPosition="bottom-right"
        >
          <Star onClick={this.unFavoritePoem} color="red" />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          tooltip={`Add poem to favorites`}
          tooltipPosition="bottom-right"
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

  // call passed down function to follow/favorite poems/users, and then update the current state
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
    if (this.props.indexCard) {
      return (
        <div key={index} style={{ overflow: "hidden" }}>
          <ShownPoemWordBox
            indexCard={this.props.indexCard}
            title={word[1]}
            left={word[2]}
            top={word[3] - 4}
            width={styles.indexCard.width}
            height={styles.indexCard.height}
            zIndex={word[4]}
          />
        </div>
      );
    } else {
      return (
        <div key={index} style={{ overflow: "hidden" }}>
          <ShownPoemWordBox
            indexCard={this.props.indexCard}
            title={word[1]}
            left={word[2]}
            top={word[3] - 4}
            width={styles.showCard.width}
            height={styles.showCard.height}
            zIndex={word[4]}
          />
        </div>
      );
    }
  };

  deleteable = () => {
    if (this.props.currUser[0].id === this.props.poem.user_id) {
      return (
        <IconButton tooltip={`Delete Poem`} tooltipPosition="bottom-right">
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
          {this.props.indexCard ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                onClick={() => {
                  this.props.showPoemLink(this.props.poem.id);
                }}
                style={styles.indexCard}
              >
                {poemWords}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  style={styles.showCard}
                  onClick={() => window.history.back()}
                >
                  {poemWords}
                </div>
              </div>
              <CardTitle title="Poem Text" subtitle={humanReadablePoem} />
            </div>
          )}
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
          {this.props.indexCard ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: 20
              }}
            >
              <div
                onClick={() => {
                  this.props.guestShowPoemLink(this.props.poem.id);
                }}
                style={styles.indexCard}
              >
                {poemWords}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  style={styles.showCard}
                  onClick={() => window.history.back()}
                >
                  {poemWords}
                </div>
              </div>
              <CardTitle title="Poem Text" subtitle={humanReadablePoem} />
            </div>
          )}
        </Card>
      );
    }
  }
}

export default Poem;
