import "./Navbar.css";
import React, { useEffect } from "react";
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
import ListItemText from "@mui/material/ListItemText";
import { getBoards } from "../../api/apiCalls";
import { useSelector, useDispatch } from "react-redux";
import { setActiveBoard, toggleOpenStartDrawer } from "../../store";
import { useFetchBoardsQuery, logout } from "../../store";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
  let { openDrawer } = useSelector((state) => state.startDrawer);
  let { token, loggedIn } = useSelector((state) => state.loggedIn);
  let dispatch = useDispatch();

  let navigate = useNavigate();
  let navigateTo = (id) => navigate("/" + id);

  let { data, isFetching, error } = useFetchBoardsQuery(token);

  let toggleDrawer = () => {
    dispatch(toggleOpenStartDrawer());
  };
  let handleLogout = () => {
    // API Call needed ?
    dispatch(logout({ token: null, loggedIn: false }));
    let dummyBoard = { model: "", pk: -1, fields: { name: "hds" } };
    dispatch(setActiveBoard(dummyBoard));
    localStorage.clear();
  };

  let drawerContent;
  if (isFetching) {
    drawerContent = <div>Loading</div>;
  } else if (error) {
    drawerContent = <div>error</div>;
  } else {
    drawerContent = data.map((board) => (
      <div key={board.pk}>
        <ListItem key={board.pk} disablePadding>
          <ListItemButton onClick={() => openBoard(board)}>
            <ListItemText
              primary={board.fields.name}
              sx={{ color: "rgb(0,0,0)" }}
            />
          </ListItemButton>
        </ListItem>
        <Divider />
      </div>
    ));
  }

  // useEffect(() => {
  //   // if (props.loggedIn) {
  //   //   getBoards().then((result) => {
  //   //     props.setBoards(result);
  //   //     if (result.length > 0) {
  //   //       let board = localStorage.getItem("board");
  //   //       let board_json = JSON.parse(board);
  //   //       if (board_json) {
  //   //         //props.handleChange(JSON.parse(board));
  //   //       } else {
  //   //         //props.handleChange(result[0]);
  //   //       }
  //   //     } else {
  //   //       //props.setBoard({});
  //   //     }
  //   //   });
  //   // }
  // }, [props.loggedIn]);

  let openBoard = (board) => {
    navigateTo(board.pk);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {loggedIn ? (
            <React.Fragment key="left">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
              <SwipeableDrawer
                anchor="left"
                open={openDrawer}
                onClose={toggleDrawer}
                onOpen={toggleDrawer}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer}
                  onKeyDown={toggleDrawer}
                >
                  <List>
                    <Typography variant="h5" align="center">
                      {" "}
                      Meine Boards
                    </Typography>
                    <Divider />
                    {drawerContent}
                  </List>
                </Box>
              </SwipeableDrawer>
            </React.Fragment>
          ) : (
            ""
          )}

          <Typography
            align="center"
            variant="h4"
            component="div"
            className="heading-responsive"
            sx={{ flexGrow: 1, fontFamily: "cursive" }}
          >
            KanbanBoard
          </Typography>
          {loggedIn ? (
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
