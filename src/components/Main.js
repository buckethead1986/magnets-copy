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
    this.props.store.dispatch({ type: "ADD_WORD" });
  };

  render() {
    console.log(this.props);
    const { snapToGridAfterDrop, snapToGridWhileDragging } = this.state;
    const z = this.props.store.getState();
    console.log(z);
    return (
      <div>
        <Container
          snapToGrid={snapToGridAfterDrop}
          url={this.props.url}
          store={this.props.store}
        />
        <CustomDragLayer snapToGrid={snapToGridWhileDragging} />
        <RaisedButton label="Test" onClick={this.handleClick} />
        <p>{this.props.store.getState().z}</p>
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
  console.log("mapStateToProps");
  return { z: state.z };
};

export default connect(mapStateToProps)(
  DragDropContext(HTML5Backend)(DragAroundCustomDragLayer)
);
