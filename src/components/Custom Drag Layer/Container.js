import React, { Component } from "react";
import PropTypes from "prop-types";
import update from "immutability-helper";
import { DropTarget } from "react-dnd";
import shouldPureComponentUpdate from "./shouldPureComponentUpdate";
import ItemTypes from "./ItemTypes";
import DraggableBox from "./DraggableBox";

//stretch goal is for draggable boxes' positions to re-render on window resize.
//I spent a while working on the problem, but couldn't get a workable solution
const styles = {
  height: "600px",
  border: "1px solid black",
  borderRightStyle: "",
  borderLeftStyle: "",
  position: "relative"
};

const poemStyles = {
  zIndex: -1,
  textAlign: "center",
  marginTop: "200px",
  marginLeft: window.innerWidth / 2 - 250,
  marginRight: window.innerWidth / 2 - 250,
  position: "absolute",
  height: "398px",
  width: "500px",
  borderTopStyle: "solid",
  borderLeftStyle: "solid",
  borderRightStyle: "solid"
};

const boxTarget = {
  drop(props, monitor, component) {
    const delta = monitor.getDifferenceFromInitialOffset();
    const item = monitor.getItem();
    let left = Math.round(item.left + delta.x);
    let top = Math.round(item.top + delta.y);
    component.moveBox(item.id, left, top);
  }
};

const arrayToObject = array =>
  array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});

class Container extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      boxes: {},
      words: []
    };
  }

  componentWillMount() {
    console.log(this.props.store.getState().wordsList);
    fetch(`${this.props.url}/words`)
      .then(res => res.json())
      .then(json => this.addBoxesToState(json));
  }

  addBoxesToState = json => {
    json.forEach(box => (box.zIndex = 0));
    const boxObject = arrayToObject(json);
    this.setState({
      boxes: boxObject
    });
  };

  //sets x,y coordinates for equal spacing between draggable boxes when rendered
  updateWordsWithWidthAndHeight = element => {
    this.props.store.dispatch({
      type: "ADD_WIDTH_AND_HEIGHT",
      payload: element
    });
    const dimensions = this.props.store.getState().allWords;
    const boxList = {};
    console.log(this.props.store.getState().wordsList);
    for (var box in this.state.boxes) {
      if (
        this.state.boxes[box].group === this.props.store.getState().wordsList
      ) {
        boxList[box] = this.state.boxes[box];
      }
    }
    console.log(
      this.props.store.getState().allWords,
      this.state.boxes,
      boxList
    );
    if (
      Object.keys(this.props.store.getState().allWords).length ===
      Object.keys(this.state.boxes).length
    ) {
      let x = 0;
      let y = 5;
      const tempBoxes = Object.assign({}, this.state.boxes);
      for (var box in tempBoxes) {
        tempBoxes[box].width = dimensions[box].width;
        tempBoxes[box].height = dimensions[box].height;
        if (x + dimensions[box].width > window.innerWidth) {
          y += dimensions[box].height + 10;
          x = 0;
        }
        tempBoxes[box].left = x;
        tempBoxes[box].top = y;
        x += dimensions[box].width + 10;
      }
      this.setState({ boxes: tempBoxes });
    }
  };

  addWordsToStore = () => {
    this.props.store.dispatch({ type: "ADD_WORD", payload: this.state.boxes });
  };

  moveBox(id, left, top) {
    this.props.store.dispatch({ type: "INCREASE_Z" });
    this.setState(
      update(this.state, {
        boxes: {
          [id]: {
            $merge: {
              left,
              top,
              zIndex: this.props.store.getState().zIndex
            }
          }
        }
      }),
      () => this.addWordsToStore()
    );
  }

  renderBox(item, key) {
    return (
      <DraggableBox
        ref={key}
        key={key}
        id={key}
        {...item}
        store={this.props.store}
        updateWordsWithWidthAndHeight={this.updateWordsWithWidthAndHeight}
      />
    );
  }

  render() {
    const { connectDropTarget } = this.props;
    // const { boxes } = this.state.boxes.filter(group => {
    //   group.group === this.props.store.getState().wordsList;
    // });
    const boxList = {};
    console.log(this.props.store.getState().wordsList);
    for (var box in this.state.boxes) {
      if (
        this.state.boxes[box].group === this.props.store.getState().wordsList
      ) {
        boxList[box] = this.state.boxes[box];
      }
    }
    const { boxes } = this.state;
    console.log(boxList, boxes, boxList[1] === boxes[1]);
    // debugger;
    return connectDropTarget(
      <div>
        <div style={styles}>
          {Object.keys(boxList).map(key => this.renderBox(boxList[key], key))}
          <div style={poemStyles}>Make Poem Here</div>
        </div>
      </div>
    );
  }
}

export default DropTarget(ItemTypes.BOX, boxTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(Container);
