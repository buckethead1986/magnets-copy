import React from "react";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle,
  FlatButton
} from "material-ui";

const Navbar = props => {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarTitle text="test" />
      </ToolbarGroup>
      <ToolbarGroup lastChild={true}>
        <FlatButton label="logout" onClick={props.logout} />
      </ToolbarGroup>
    </Toolbar>
  );
};
export default Navbar;
