import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import update from "immutability-helper";
import { DropTarget } from "react-dnd";
import shouldPureComponentUpdate from "./shouldPureComponentUpdate";
import ItemTypes from "./ItemTypes";
import DraggableBox from "./DraggableBox";
import snapToGrid from "./snapToGrid";
// import { RaisedButton } from "material-ui";
let counter = 0;

const styles = {
  width: 700,
  height: 500,
  border: "1px solid black",
  position: "relative"
};

const boxTarget = {
  drop(props, monitor, component) {
    const delta = monitor.getDifferenceFromInitialOffset();
    const item = monitor.getItem();

    let left = Math.round(item.left + delta.x);
    let top = Math.round(item.top + delta.y);
    if (props.snapToGrid) {
      [left, top] = snapToGrid(left, top);
    }

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
    connectDropTarget: PropTypes.func.isRequired,
    snapToGrid: PropTypes.bool.isRequired
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      boxes: {},
      // boxes: {
      //   a: { top: 20, left: 80, title: "Drag me around" },
      //   b: { top: 180, left: 20, title: "Drag me too" },
      //   c: { top: 40, left: 50, title: "Banana" },
      //   d: { top: 200, left: 100, title: "Alex" }
      // },
      words: []
    };
  }

  componentWillMount() {
    fetch(`${this.props.url}/words`)
      .then(res => res.json())
      .then(json => this.addBoxesToState(json));
  }

  addBoxesToState = json => {
    const boxObject = arrayToObject(json);
    this.setState({
      boxes: boxObject
    });
  };

  // convertBoxArrayToObject = json => {
  //   // const peopleObject = arrayToObject(json);
  //   let x = 0;
  //   let y = 0;
  //   for (var box in peopleObject) {
  //     // console.log(peopleObject[box]);
  //     peopleObject[box].left = x;
  //     peopleObject[box].top = y;
  //
  //     // x += peopleObject[box].title.length + 40;
  //   }
  //   this.props.store.dispatch({
  //     type: "ADD_ALL_WORDS",
  //     payload: peopleObject
  //   });
  //   // console.log(peopleObject);
  //   this.setState(
  //     {
  //       boxes: peopleObject
  //     },
  //     () => console.log(this.state.boxes)
  //   );
  // };

  updateWordsWithWidthAndHeight = element => {
    counter = counter + 1;
    console.log("element ", element.offsetWidth, element.offsetHeight);
    this.props.store.dispatch({
      type: "ADD_WIDTH_AND_HEIGHT",
      payload: element
    });
    // const boxes = this.state.boxes;
    // console.log(boxes);
    // let x = 0;
    // let y = 0;
    // for (var box in boxes) {
    //   // console.log(boxes[box]);
    //   boxes[box].left = x;
    //   boxes[box].top = y;
    //
    //   // x += peopleObject[box].title.length + 40;
    // }
    console.log(this.state.boxes, this.props.store.getState());
    const dimensions = this.props.store.getState().allWords;
    if (
      Object.keys(this.props.store.getState().allWords).length ===
      Object.keys(this.state.boxes).length
    ) {
      let x = 0;
      let y = 0;
      for (var box in this.state.boxes) {
        this.state.boxes[box].width = dimensions[box].width;
        this.state.boxes[box].height = dimensions[box].height;
        if (x + dimensions[box].width > styles.width) {
          y += dimensions[box].height + 10;
          x = 0;
        }
        this.state.boxes[box].left = x;
        this.state.boxes[box].top = y;
        x += dimensions[box].width + 10;
        this.forceUpdate();
      }
      console.log(this.state.boxes);
      const newBoxes = this.state.boxes;
      // this.setState({
      //   boxes: newBoxes
      // });
    }
    console.log(this.state.boxes);
  };

  addWordsToStore = () => {
    // console.log("addWordsToStore", this.state.boxes);
    this.props.store.dispatch({ type: "ADD_WORD", payload: this.state.boxes });
    // console.log(this.props.store.getState().words);
  };

  moveBox(id, left, top) {
    this.props.store.dispatch({ type: "INCREASE_Z" });
    // console.log("moving", this.state, this.props.store.getState().zIndex);
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
    const { boxes } = this.state;

    return connectDropTarget(
      <div>
        <div style={styles}>
          {Object.keys(boxes).map(key => this.renderBox(boxes[key], key))}
          <div className="test">Make Poem Here</div>
        </div>
      </div>
    );
  }
}

export default DropTarget(ItemTypes.BOX, boxTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(Container);
