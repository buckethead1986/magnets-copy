import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import { Grid, Row, Col } from "react-flexbox-grid";
import { connect } from "react-redux";
import HTML5Backend from "react-dnd-html5-backend";
import Container from "../draggableWordBoxes/Container";
import SelectWordsListDropdown from "../draggableWordBoxes/SelectWordsListDropdown";
import CustomDragLayer from "../draggableWordBoxes/CustomDragLayer";

class CreatePoemContainer extends Component {
  componentWillMount() {
    const wordsGroup = this.props.words.filter(word => {
      return word.group === 1;
    });
    this.props.store.dispatch({
      type: "CHANGE_WORDS_GROUP",
      payload: wordsGroup
    });
  }

  //modifies the currently shown group of words based on SelectWordsListDropdown choice, removes any currently used words from poem creation area
  //I don't like using forceUpdate(), but I couldn't get it working otherwise
  filteredWords = words => {
    const wordsGroup = this.props.words.filter(word => {
      return word.group === words;
    });
    this.props.store.dispatch({ type: "CHANGE_WORDS_LIST", payload: words });
    this.props.store.dispatch({
      type: "CHANGE_WORDS_GROUP",
      payload: wordsGroup
    });
    this.removePoem();
    this.forceUpdate();
  };

  //removes the words in the poem creation box
  removePoem = () => {
    this.props.store.dispatch({ type: "REMOVE_POEM" });
  };

  // handleLogin = () => {
  //   const headers = {
  //     Accept: "application/json",
  //     "Content-Type": "application/json"
  //   };
  //   const body = this.state;
  //   fetch(`${this.props.url}/auth`, {
  //     method: "POST",
  //     headers: headers,
  //     body: JSON.stringify(body)
  //   })
  //     .then(res => res.json())
  //     .then(json => {
  //       if (!json.error) {
  //         localStorage.setItem("token", json.jwt);
  //       } else {
  //         this.setState({
  //           loginError: true
  //         });
  //       }
  //     })
  //     .then(() => this.props.fetchUsers())
  //     .then(() => this.props.history.push("/profile"));
  // };

  render() {
    const words = this.props.store.getState().wordsGroup;

    return (
      <div>
        <Grid>
          <Row>
            <Col>
              <SelectWordsListDropdown
                style={{ clear: "both", float: "left" }}
                store={this.props.store}
                users={this.props.users}
                words={this.props.words}
                filteredWords={this.filteredWords}
              />
            </Col>
            <Col />
          </Row>
        </Grid>

        <Container
          style={{ clear: "both" }}
          url={this.props.url}
          store={this.props.store}
          words={words}
          changeWindowWidth={this.changeWindowWidth}
          windowWidth={window.innerWidth}
        />
        <CustomDragLayer
          store={this.props.store}
          zIndex={this.props.store.getState().zIndex}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { zIndex: state.zIndex, wordsList: state.wordsList };
};

export default connect(mapStateToProps)(
  DragDropContext(HTML5Backend)(CreatePoemContainer)
);
