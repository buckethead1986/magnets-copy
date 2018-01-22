import React from "react";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import FontIcon from "material-ui/FontIcon";
import NavigationExpandMoreIcon from "material-ui/svg-icons/navigation/expand-more";
import ListIcon from "material-ui/svg-icons/action/list";
import SvgIcon from "material-ui/SvgIcon";
import MenuItem from "material-ui/MenuItem";
import DropDownMenu from "material-ui/DropDownMenu";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import { cyan500 } from "material-ui/styles/colors";

import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "material-ui/Toolbar";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (event, value) => {
    switch (value) {
      case 1:
        this.props.profileLink();
        break;
      case 2:
        this.props.makePoem();
        break;
      case 3:
        this.props.showUsers();
        break;
      case 4:
        this.props.showPoems();
        break;
      default:
        console.log("nothing selected");
    }
  };

  render() {
    return (
      <Toolbar style={{ backgroundColor: cyan500 }}>
        <ToolbarGroup firstchild="true">
          <IconMenu
            onChange={this.handleChange}
            iconButtonElement={
              <IconButton>
                <ListIcon />
              </IconButton>
            }
          >
            <MenuItem value={1} primaryText="My Profile" />
            <MenuItem value={2} primaryText="Make Poem" />
            <MenuItem value={3} primaryText="Users" />
            <MenuItem value={4} primaryText="Poems" />
          </IconMenu>
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <FlatButton
            label="Logout"
            primary={false}
            onClick={this.props.logout}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
