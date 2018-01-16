import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Container from "./Custom Drag Layer/Container";
import Container2 from "./Custom Drag Layer/Container2";
import CustomDragLayer from "./Custom Drag Layer/CustomDragLayer";
import { RaisedButton } from "material-ui";
import { connect } from "react-redux";

class DragAroundCustomDragLayer extends Component {
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

  // makePoem = () => {
  //   this.setState(
  //     {
  //       words: []
  //     },
  //     () => this.addNewWords()
  //   );
  // };
  //
  // addNewWords = () => {
  //   for (var box in this.state.boxes) {
  //     if (this.state.boxes[box].top > 300) {
  //       this.setState(
  //         {
  //           words: this.state.words >> this.state.boxes[box]
  //         },
  //         () => console.log(this.state.words)
  //       );
  //     }
  //   }
  // };

  submitPoem = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = this.props.store.getState().words;
    // console.log(body);
    let thisPoem = [];
    if (Object.keys(body).length !== 0) {
      thisPoem = this.formatPoem([], body, Object.keys(body).length - 1, {
        string: ""
      });
    }
    console.log(JSON.stringify(thisPoem));
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
    // this.wordRelationships(thisPoem);
  };

  wordRelationships = (json, thisPoem) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    for (var box in thisPoem) {
      console.log(thisPoem[box]);
      if (box !== "string") {
        const body = {
          word_id: box,
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

  formatPoem = (poem, body, length, content) => {
    console.log("############# New Recursion #############");
    // debugger;
    let x = 700; //Container.js styles.width
    let y = 500; //Container.js styles.height
    let currentWord = "";

    for (var word in body) {
      console.log("The word this round is", body[word].title, y, x);
      if (body[word].top < y - body[word].height / 2) {
        console.log("hit first");
        y = body[word].top;
        x = body[word].left;
        currentWord = word;
      }
      if (body[word].left < x && body[word].top < y + body[word].height / 2) {
        console.log("hit second");
        y = body[word].top;
        x = body[word].left;
        currentWord = word;
      }
      console.log(
        "word",
        '"' + body[word].title + '"',
        "currentWord",
        '"' + body[currentWord].title + '"'
      );
      console.log("-------------------");
      // if (body[word].left < x) {
      //   x = body[word].left;
      //   currentWord = word;
      // }
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
    poem.push(body[currentWord]);
    delete body[currentWord];
    if (length > 0) {
      this.formatPoem(poem, body, length - 1, content);
    }
    let poem1 = "";
    for (var box in poem) {
      poem1 += poem[box].title;
    }
    console.log(poem1);
    // console.log("Poem:", poem[0].title, poem[1].title, poem[2].title);
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

export default connect(mapStateToProps)(
  DragDropContext(HTML5Backend)(DragAroundCustomDragLayer)
);
