import React from "react";
import { RaisedButton } from "material-ui";

let styles = {
  width: window.innerWidth / 1.3
};

class Tutorial extends React.Component {
  returnButton = () => {
    if (localStorage.getItem("token")) {
      return (
        <RaisedButton
          label="Return to Profile"
          primary={true}
          onClick={() => this.props.history.push("/profile")}
        />
      );
    } else {
      return (
        <RaisedButton
          label="Back to Login"
          primary={true}
          onClick={() => this.props.history.push("/login")}
        />
      );
    }
  };
  render() {
    return (
      <div>
        <h3 align="center">
          Welcome to the tutorial! Scroll down through some screenshots to learn
          how to navigate Magnets
        </h3>
        <h4 align="center">
          Upon logging in, you'll arrive at your profile page. All your poems
          will display, and you can select other users on the left to see their
          poems. All poems can be favorited and the poems author can be followed
          by clicking the icons at the bottom of the poem box (The option to
          follow yourself is disabled. Sorry, narcissists)
        </h4>
        <h4>
          The 3 lines in the upper left corner open a dropdown menu that lets
          you come back to your Profile page (the image below this), Make a New
          Poem, and All Poems (Explained below)
        </h4>
        <img width={styles.width} src={require("./tutorial_profile.png")} />
        <h4>Selecting Make a New Poem brings you to the poem creation page!</h4>
        <img width={styles.width} src={require("./tutorial_makepoem.png")} />
        <h4>
          Selecting All Poems from the dropdown menu shows you (surprisingly!)
          all the poems. You can filter these results by selecting as many users
          as you want, and/or showing just the poems you've favorited.
        </h4>
        <img width={styles.width} src={require("./tutorial_allpoems.png")} />
        <br />
        <br />
        <br />
        <h4>
          Clicking on a poem anywhere will direct you to the show page for that
          particular poem, shown here.
        </h4>
        <img width={styles.width} src={require("./tutorial_singlepoem.png")} />
        <br />
        <h4>
          That's it. I hope you have some fun making profound, silly, and
          profoundly silly poems!
        </h4>
        {this.returnButton()}
      </div>
    );
  }
}

export default Tutorial;
