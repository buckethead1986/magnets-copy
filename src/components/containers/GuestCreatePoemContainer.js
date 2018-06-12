import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import { Grid, Row, Col } from "react-flexbox-grid";
import { connect } from "react-redux";
import HTML5Backend from "react-dnd-html5-backend";
import Container from "../draggableWordBoxes/Container";
import { withStyles } from "@material-ui/core/styles";
import SelectWordsListDropdown from "../draggableWordBoxes/SelectWordsListDropdown";
import CustomDragLayer from "../draggableWordBoxes/CustomDragLayer";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: "#2196F3",
    textColor: "white"
  }
});

let output = "";

class CreatePoemContainer extends Component {
  componentWillMount() {
    const wordsGroup = this.props.words.filter(word => {
      return word.group === 1;
    });
    this.props.store.dispatch({
      type: "CHANGE_WORDS_GROUP",
      payload: wordsGroup
    });
  }

  submitPoem = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = Object.assign({}, this.props.store.getState().words);
    if (Object.keys(body).length !== 0) {
      this.formatPoem(body, Object.keys(body).length - 1, output);
    }
    console.log(headers, body, output);
    if (output.length !== 0) {
      fetch(`${this.props.url}/poems`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          user_id: this.props.currUser[0].id,
          content: output
        })
      })
        .then(res => res.json())
        .then(json => {
          this.removePoem();
          this.props.fetchUsers();
          this.props.showPoemLink(json.id);
        });
    }
  };

  //modifies the currently shown group of words based on SelectWordsListDropdown choice, removes any currently used words from poem creation area
  //I don't like using forceUpdate(), but I couldn't get it working otherwise
  filteredWords = words => {
    const wordsGroup = this.props.words.filter(word => {
      return word.group === words;
    });
    this.props.store.dispatch({ type: "CHANGE_WORDS_LIST", payload: words });
    this.props.store.dispatch({
      type: "CHANGE_WORDS_GROUP",
      payload: wordsGroup
    });
    this.removePoem();
    this.forceUpdate();
  };

  //removes the words in the poem creation box
  removePoem = () => {
    this.props.store.dispatch({ type: "REMOVE_POEM" });
    output = "";
  };

  //'content' is the formatted poem for posting to the API, as a human would read it, with word id, title, and x,y coordinates of each word (for later viewing)
  formatPoem = (body, length, content) => {
    let x = window.innerWidth;
    let y = 600; //draggableWordBoxes/Container constant styles.height. Not worth settng as a prop to pass to both components
    let currentWord = "";
    for (var word in body) {
      if (body[word].top < y - body[word].height / 2) {
        y = body[word].top;
        x = body[word].left;
        currentWord = word;
      }
      if (body[word].left < x && body[word].top < y + body[word].height / 2) {
        y = body[word].top;
        x = body[word].left;
        currentWord = word;
      }
    }
    const newLeft = body[currentWord].left - (window.innerWidth / 2 - 248);

    if (content.length === 0) {
      content =
        content +
        body[currentWord].id +
        "/" +
        body[currentWord].title +
        "/" +
        newLeft +
        "/" +
        (body[currentWord].top - 200);
    } else {
      content =
        content +
        "|" +
        body[currentWord].id +
        "/" +
        body[currentWord].title +
        "/" +
        newLeft +
        "/" +
        (body[currentWord].top - 200);
    }
    delete body[currentWord];
    output = content;
    if (length > 0) {
      this.formatPoem(body, length - 1, content);
    }
  };

  render() {
    const words = this.props.store.getState().wordsGroup;
    const { classes } = this.props;

    return (
      <div>
        <Grid>
          <Row>
            <Col>
              <SelectWordsListDropdown
                style={{ clear: "both", float: "left" }}
                store={this.props.store}
                users={this.props.users}
                words={this.props.words}
                filteredWords={this.filteredWords}
              />
            </Col>
          </Row>
        </Grid>
        <Container
          style={{ clear: "both" }}
          url={this.props.url}
          currUser={this.props.currUser}
          store={this.props.store}
          words={words}
          changeWindowWidth={this.changeWindowWidth}
          windowWidth={window.innerWidth}
        />
        <CustomDragLayer
          store={this.props.store}
          zIndex={this.props.store.getState().zIndex}
        />
        {this.props.currUser.length !== 0 ? (
          <Button
            variant="raised"
            color="primary"
            className={classes.button}
            onClick={this.submitPoem}
          >
            {" "}
            Submit Poem
          </Button>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { zIndex: state.zIndex, wordsList: state.wordsList };
};

export default withStyles(styles)(
  connect(mapStateToProps)(DragDropContext(HTML5Backend)(CreatePoemContainer))
);
