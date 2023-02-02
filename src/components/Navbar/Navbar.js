import "./Navbar.css";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import StartDrawer from "../StartDrawer/StartDrawer";
import LogoutButton from "../LogoutButton/LogoutButton";

export default function Navbar() {
  let { loggedIn } = useSelector((state) => state.loggedIn);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {loggedIn ? <StartDrawer /> : ""}

          <Typography
            align="center"
            variant="h4"
            component="div"
            className="heading-responsive"
            sx={{ flexGrow: 1, fontFamily: "cursive" }}
          >
            KanbanBoard
          </Typography>
          {loggedIn ? <LogoutButton /> : ""}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
