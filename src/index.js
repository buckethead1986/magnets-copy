import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Reducer from "./components/reducer/Reducer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const store = createStore(
  Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//stretch goal to let users change font color, doesn't change anything currently
const muiTheme = getMuiTheme({
  menuItem: { selectedTextColor: "black" }
});

ReactDOM.render(
  <Router>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={store}>
        <App store={store} />
      </Provider>
    </MuiThemeProvider>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
