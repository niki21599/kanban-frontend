import React from "react";
import "./AddButton.css";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AddBoard from "../AddBoard/AddBoard";

import AddTask from "../AddTask/AddTask";
import AddUser from "../AddUser/AddUser";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryAddTaskForm, setOpenAddUserDialog } from "../../store";
import { setOpenAddButtonDialog } from "../../store";
import { setOpenAddBoardDialog } from "../../store";
import { setOpenAddTaskDialog } from "../../store";

const actions = [
  { icon: <AssignmentOutlinedIcon />, name: "New Task" },
  { icon: <DashboardOutlinedIcon />, name: "New Board" },
  { icon: <PersonOutlineIcon />, name: "Add User" },
];

export default function AddButton(props) {
  const { open } = useSelector((state) => state.addButtonDialog);

  let dispatch = useDispatch();

  const handleOpen = () => dispatch(setOpenAddButtonDialog(true));
  const handleClose = () => dispatch(setOpenAddButtonDialog(false));

  const openDialog = (name) => {
    if (name === "New Task") {
      dispatch(setOpenAddTaskDialog(true));
      dispatch(setCategoryAddTaskForm("To do"));
    }
    if (name === "Add User") {
      dispatch(setOpenAddUserDialog(true));
    }
    if (name === "New Board") {
      dispatch(setOpenAddBoardDialog(true));
    }
  };

  return (
    <div>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => openDialog(action.name)}
          />
        ))}{" "}
      </SpeedDial>{" "}
      <AddBoard /> <AddTask /> <AddUser />{" "}
    </div>
  );
}
