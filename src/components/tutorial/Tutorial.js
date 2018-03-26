import React from "react";
import { RaisedButton } from "material-ui";

let styles = {
  width: window.innerWidth
};

const Tutorial = props => {
  return (
    <div>
      <RaisedButton
        label="Back to Login"
        primary="true"
        onClick={() => props.history.push("/login")}
      />
      <img width={styles.width} src={require("./tutorial_screenshot.png")} />
    </div>
  );
};

export default Tutorial;
