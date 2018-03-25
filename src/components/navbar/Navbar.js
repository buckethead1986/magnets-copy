import React from "react";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import ListIcon from "material-ui/svg-icons/action/list";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import { cyan500 } from "material-ui/styles/colors";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";

export default class Navbar extends React.Component {
  handleChange = (event, value) => {
    switch (value) {
      case 1:
        this.props.profileLink();
        break;
      case 2:
        this.props.makePoem();
        break;
      case 3:
        this.props.showPoems();
        break;
      default:
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
            <MenuItem value={3} primaryText="Poems" />
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
