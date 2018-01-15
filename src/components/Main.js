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

  handleClick = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = this.props.store.getState().words;
    console.log(body);
    if (body !== []) {
      fetch(`${this.props.url}/poems`, {
        method: "POST",
        headers: headers,
        body: body
      })
        .then(res => res.json())
        .then(json => console.log(json));
    }
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
        <RaisedButton label="Submit Poem" onClick={this.handleClick} />

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
