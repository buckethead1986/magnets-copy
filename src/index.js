import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Reducer from "./components/Custom Drag Layer/Reducer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const store = createStore(
  Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Router>
    <MuiThemeProvider>
      <Provider store={store}>
        <App store={store} />
      </Provider>
    </MuiThemeProvider>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();

// import React, { Component } from "react";
// import Container from "./components/dragComponent/Container";
//
// export default class DragAroundNaive extends Component {
//   constructor(props) {
//     super(props);
//     this.handleHideSourceClick = this.handleHideSourceClick.bind(this);
//     this.state = {
//       hideSourceOnDrag: true
//     };
//   }
//
//   handleHideSourceClick() {
//     this.setState({
//       hideSourceOnDrag: !this.state.hideSourceOnDrag
//     });
//   }
//
//   render() {
//     const { hideSourceOnDrag } = this.state;
//
//     return (
//       <div>
//         <p>
//           <b>
//             <a href="https://github.com/react-dnd/react-dnd/tree/master/examples/02%20Drag%20Around/Naive">
//               Browse the Source
//             </a>
//           </b>
//         </p>
//         <p>
//           This example naively relies on browser drag and drop implementation
//           without much custom logic.
//         </p>
//         <p>
//           When the box is dragged, we remove its original DOM node by returning{" "}
//           <code>null</code> from <code>render()</code> and let browser draw the
//           drag preview. When the is released, we draw it at the new coordinates.
//           If you try to drag the box outside the container, the browser will
//           animate its return.
//         </p>
//         <p>
//           While this approach works for simple cases, it flickers on drop. This
//           happens because the browser removes the drag preview before we have a
//           chance to make the dragged item visible. This might not be a problem
//           if you dim the original item instead of hiding it, but it&apos;s
//           clearly visible otherwise.
//         </p>
//         <p>
//           If we want to add custom logic such as snapping to grid or bounds
//           checking, we can only do this on drop. There is no way for us to
//           control what happens to dragged preview once the browser has drawn it.
//           Check out the{" "}
//           <a href="examples-drag-around-custom-drag-layer.html">
//             custom rendering example
//           </a>{" "}
//           if you&apos;d rather trade more control for some more work.
//         </p>
//         <Container hideSourceOnDrag={hideSourceOnDrag} />
//         <p>
//           <label htmlFor="hideSourceOnDrag">
//             <input
//               id="hideSourceOnDrag"
//               type="checkbox"
//               checked={hideSourceOnDrag}
//               onChange={this.handleHideSourceClick}
//             />
//             <small>Hide the source item while dragging</small>
//           </label>
//         </p>
//       </div>
//     );
//   }
// }

// import React, { Component } from "react";
// import { DragDropContext } from "react-dnd";
// import HTML5Backend from "react-dnd-html5-backend";
// import Container from "./components/example/Container";
// import CustomDragLayer from "./components/example/CustomDragLayer";
//
// @DragDropContext(HTML5Backend)
// export default class DragAroundCustomDragLayer extends Component {
//   constructor(props) {
//     super(props);
//
//     this.handleSnapToGridAfterDropChange = this.handleSnapToGridAfterDropChange.bind(
//       this
//     );
//     this.handleSnapToGridWhileDraggingChange = this.handleSnapToGridWhileDraggingChange.bind(
//       this
//     );
//
//     this.state = {
//       snapToGridAfterDrop: false,
//       snapToGridWhileDragging: false
//     };
//   }
//
//   render() {
//     const { snapToGridAfterDrop, snapToGridWhileDragging } = this.state;
//
//     return (
//       <div>
//         <p>
//           <b>
//             <a href="https://github.com/react-dnd/react-dnd/tree/master/examples/02%20Drag%20Around/Custom%20Drag%20Layer">
//               Browse the Source
//             </a>
//           </b>
//         </p>
//         <p>
//           The browser APIs provide no way to change the drag preview or its
//           behavior once drag has started. Libraries such as jQuery UI implement
//           the drag and drop from scratch to work around this, but react-dnd only
//           supports browser drag and drop “backend” for now, so we have to accept
//           its limitations.
//         </p>
//         <p>
//           We can, however, customize behavior a great deal if we feed the
//           browser an empty image as drag preview. This library provides a{" "}
//           <code>DragLayer</code> that you can use to implement a fixed layer on
//           top of your app where you&apos;d draw a custom drag preview component.
//         </p>
//         <p>
//           Note that we can draw a completely different component on our drag
//           layer if we wish so. It&apos;s not just a screenshot.
//         </p>
//         <p>
//           With this approach, we miss out on default “return” animation when
//           dropping outside the container. However, we get great flexibility in
//           customizing drag feedback and zero flicker.
//         </p>
//         <Container snapToGrid={snapToGridAfterDrop} />
//         <CustomDragLayer snapToGrid={snapToGridWhileDragging} />
//         <p>
//           <label htmlFor="snapToGridWhileDragging">
//             <input
//               id="snapToGridWhileDragging"
//               type="checkbox"
//               checked={snapToGridWhileDragging}
//               onChange={this.handleSnapToGridWhileDraggingChange}
//             />
//             <small>Snap to grid while dragging</small>
//           </label>
//           <br />
//           <label htmlFor="snapToGridAfterDrop">
//             <input
//               id="snapToGridAfterDrop"
//               type="checkbox"
//               checked={snapToGridAfterDrop}
//               onChange={this.handleSnapToGridAfterDropChange}
//             />
//             <small>Snap to grid after drop</small>
//           </label>
//         </p>
//       </div>
//     );
//   }
//
//   handleSnapToGridAfterDropChange() {
//     this.setState({
//       snapToGridAfterDrop: !this.state.snapToGridAfterDrop
//     });
//   }
//
//   handleSnapToGridWhileDraggingChange() {
//     this.setState({
//       snapToGridWhileDragging: !this.state.snapToGridWhileDragging
//     });
//   }
// }
