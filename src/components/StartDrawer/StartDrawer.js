import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@mui/material";
import { useFetchBoardsQuery, toggleOpenStartDrawer } from "../../store";
import {
  ListItem,
  ListItemButton,
  IconButton,
  Box,
  ListItemText,
  SwipeableDrawer,
  List,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function StartDrawer() {
  let { token } = useSelector((state) => state.loggedIn);
  let { openDrawer } = useSelector((state) => state.startDrawer);
  let dispatch = useDispatch();

  let navigate = useNavigate();
  let navigateTo = (id) => navigate("/" + id);

  let { data, isFetching, error } = useFetchBoardsQuery(token);
  let drawerContent;
  if (isFetching) {
    drawerContent = (
      <div>
        <LoadingSpinner />
      </div>
    );
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

  let openBoard = (board) => {
    navigateTo(board.pk);
  };
  let toggleDrawer = () => {
    dispatch(toggleOpenStartDrawer());
  };

  return (
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
  );
}
