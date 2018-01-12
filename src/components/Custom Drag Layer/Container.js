import React, { Component } from "react";
import PropTypes from "prop-types";
import update from "immutability-helper";
import { DropTarget } from "react-dnd";
import shouldPureComponentUpdate from "./shouldPureComponentUpdate";
import ItemTypes from "./ItemTypes";
import DraggableBox from "./DraggableBox";
import snapToGrid from "./snapToGrid";
// import { RaisedButton } from "material-ui";

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
      boxes: {
        a: { top: 20, left: 80, title: "Drag me around" },
        b: { top: 180, left: 20, title: "Drag me too" },
        c: { top: 40, left: 50, title: "Banana" },
        d: { top: 200, left: 100, title: "Alex" }
      },
      words: []
    };
  }

  componentDidMount() {
    fetch(`${this.props.url}/words`)
      .then(res => res.json())
      .then(json => this.convertBoxArrayToObject(json));
  }

  convertBoxArrayToObject = json => {
    const peopleObject = arrayToObject(json);
    console.log(peopleObject);
    this.setState({
      boxes: peopleObject
    });
  };

  addWordsToStore = () => {
    console.log("addWordsToStore");
    this.props.store.dispatch({ type: "ADD_WORD", payload: this.state.boxes });
    console.log(this.props.store.getState().words);
  };

  moveBox(id, left, top) {
    console.log("moving");
    this.setState(
      update(this.state, {
        boxes: {
          [id]: {
            $merge: { left, top }
          }
        }
      }),
      () => this.addWordsToStore()
    );
  }

  renderBox(item, key) {
    return <DraggableBox key={key} id={key} {...item} />;
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
