import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Container from "./Custom Drag Layer/Container";
import CustomDragLayer from "./Custom Drag Layer/CustomDragLayer";
import { RaisedButton } from "material-ui";
import { connect } from "react-redux";

class Main extends Component {
  constructor(props) {
    super(props);

    this.handleSnapToGridAfterDropChange = this.handleSnapToGridAfterDropChange.bind(
      this
    );
    this.handleSnapToGridWhileDraggingChange = this.handleSnapToGridWhileDraggingChange.bind(
      this
    );

    this.state = {
      snapToGridAfterDrop: false,
      snapToGridWhileDragging: false
    };
  }

  submitPoem = () => {
    let thisPoem = [];
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = Object.assign({}, this.props.store.getState().words);
    if (Object.keys(body).length !== 0) {
      thisPoem = this.formatPoem(body, Object.keys(body).length - 1, {
        string: ""
      });
    }
    if (thisPoem.length !== 0) {
      fetch(`${this.props.url}/poems`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          user_id: 1,
          content: thisPoem
        })
      })
        .then(res => res.json())
        .then(json => this.wordRelationships(json, thisPoem));
    }
  };

  wordRelationships = (json, thisPoem) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    for (var box in thisPoem) {
      if (box !== "string") {
        const body = {
          word_id: box,
          poem_id: json.id
        };
        fetch(`${this.props.url}/poem_words`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body)
        });
        // .then(res => res.json())
        // .then(json => console.log(json));
      }
    }
    // this.removePoem();
  };

  // removePoem = () => {
  //   console.log(this.props.store.getState().words);
  //   this.props.store.dispatch({ type: "REMOVE_POEM" });
  //   console.log(this.props.store.getState().words);
  // };

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
    content.string =
      content.string +
      body[currentWord].title +
      "/" +
      body[currentWord].id +
      "|";
    content[body[currentWord].id] = {
      title: body[currentWord].title,
      x: body[currentWord].left,
      y: body[currentWord].top
    };
    delete body[currentWord];
    if (length > 0) {
      this.formatPoem(body, length - 1, content);
    }
    return content;
  };

  render() {
    const { snapToGridAfterDrop, snapToGridWhileDragging } = this.state;

    return (
      <div>
        <Container
          snapToGrid={snapToGridAfterDrop}
          url={this.props.url}
          store={this.props.store}
          changeWindowWidth={this.changeWindowWidth}
          windowWidth={window.innerWidth}
        />
        <CustomDragLayer
          snapToGrid={snapToGridWhileDragging}
          store={this.props.store}
          zIndex={this.props.store.getState().zIndex}
        />
        <RaisedButton label="Submit Poem" onClick={this.submitPoem} />

        <p>
          <label htmlFor="snapToGridWhileDragging">
            <input
              id="snapToGridWhileDragging"
              type="checkbox"
              checked={snapToGridWhileDragging}
              onChange={this.handleSnapToGridWhileDraggingChange}
            />
            <small>Snap to grid while dragging</small>
          </label>
          <br />
          <label htmlFor="snapToGridAfterDrop">
            <input
              id="snapToGridAfterDrop"
              type="checkbox"
              checked={snapToGridAfterDrop}
              onChange={this.handleSnapToGridAfterDropChange}
            />
            <small>Snap to grid after drop</small>
          </label>
        </p>
      </div>
    );
  }

  handleSnapToGridAfterDropChange() {
    this.setState({
      snapToGridAfterDrop: !this.state.snapToGridAfterDrop
    });
  }

  handleSnapToGridWhileDraggingChange() {
    this.setState({
      snapToGridWhileDragging: !this.state.snapToGridWhileDragging
    });
  }
}

const mapStateToProps = state => {
  return { zIndex: state.zIndex };
};

export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(Main));
