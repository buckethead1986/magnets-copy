import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Container from "./Custom Drag Layer/Container";
import CustomDragLayer from "./Custom Drag Layer/CustomDragLayer";
import { RaisedButton } from "material-ui";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
let output = "";

class CreatePoemContainer extends Component {
  submitPoem = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = Object.assign({}, this.props.store.getState().words);
    console.log(body, this.props);
    debugger;
    if (Object.keys(body).length !== 0) {
      this.formatPoem(body, Object.keys(body).length - 1, output);
    }
    console.log(this.props.store.getState().words, body, output);
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
          this.wordRelationships(json, output);
          this.removePoem();
          this.props.showPoem(json.id);
        });
    }
  };

  wordRelationships = (json, thisPoem) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const wordIdArray = thisPoem.split("|").map(word => {
      return word.split("/")[0];
    });
    for (var word of wordIdArray) {
      if (word !== "") {
        const body = {
          word_id: word,
          poem_id: json.id
        };
        fetch(`${this.props.url}/poem_words`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body)
        })
          .then(res => res.json())
          .then(json => console.log(json));
      }
    }
  };

  removePoem = () => {
    this.props.store.dispatch({ type: "REMOVE_POEM" });
    output = "";
  };

  //'content' is the formatted poem for posting to the API, as a human would read it, with word id, title, and x,y coordinates of each word (for later viewing)
  formatPoem = (body, length, content) => {
    let x = window.innerWidth;
    let y = 600; //Container.js styles.height
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
    console.log(this.props.store.getState().words);
    const intro =
      "Create a new poem! Drag words around and click 'Submit Poem' once you're satisfied";

    return (
      <div>
        <h4 align="center">{intro}</h4>
        <br />
        <Container
          url={this.props.url}
          store={this.props.store}
          changeWindowWidth={this.changeWindowWidth}
          windowWidth={window.innerWidth}
        />
        <CustomDragLayer
          store={this.props.store}
          zIndex={this.props.store.getState().zIndex}
        />
        <RaisedButton label="Submit Poem" onClick={this.submitPoem} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { zIndex: state.zIndex };
};

export default connect(mapStateToProps)(
  DragDropContext(HTML5Backend)(CreatePoemContainer)
);
