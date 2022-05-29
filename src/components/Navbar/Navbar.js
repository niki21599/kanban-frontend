import "./Navbar.css";
import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { ListSubheader } from "@mui/material";

class Navbar extends React.Component {
  state = {
    openDrawer: false,
    boards: [
      { name: "Board1", id: 0 },
      { name: "Board2", id: 1 },
    ],
  };

  toggleDrawer = () => {
    this.setState({ openDrawer: !this.state.openDrawer });
  };

  list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={this.toggleDrawer}
      onKeyDown={this.toggleDrawer}
    >
      <List>
        <Typography variant="h5" align="center">
          {" "}
          Meine Boards
        </Typography>
        <Divider />
        {this.state.boards.map((name, id) => (
          <div key={id}>
            <ListItem key={id} disablePadding>
              <ListItemButton>
                <ListItemText primary={"Test"} sx={{ color: "rgb(0,0,0)" }} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Box>
  );

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <React.Fragment key="left">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={this.toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
              <SwipeableDrawer
                anchor="left"
                open={this.state.openDrawer}
                onClose={this.toggleDrawer}
                onOpen={this.toggleDrawer}
              >
                {this.list}
              </SwipeableDrawer>
            </React.Fragment>

            <Typography
              align="center"
              variant="h4"
              component="div"
              sx={{ flexGrow: 1, fontFamily: "cursive" }}
            >
              KanbanBoard
            </Typography>
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

export default Navbar;
