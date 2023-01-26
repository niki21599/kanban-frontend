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
import { useDispatch } from "react-redux";
import { setOpenAddUserDialog } from "../../store";

const actions = [
  { icon: <AssignmentOutlinedIcon />, name: "New Task" },
  { icon: <DashboardOutlinedIcon />, name: "New Board" },
  { icon: <PersonOutlineIcon />, name: "Add User" },
];

export default function AddButton(props) {
  const [open, setOpen] = React.useState(false);
  const [newBoard, setNewBoard] = React.useState(false);
  let dispatch = useDispatch();

  const [addTask, setAddTask] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const openDialog = (name) => {
    if (name === "New Task") {
      setAddTask(true);
    }
    if (name === "Add User") {
      dispatch(setOpenAddUserDialog(true));
    }
    if (name === "New Board") {
      setNewBoard(true);
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
      <AddBoard
        open={newBoard}
        setOpen={setNewBoard}
        addBoard={props.addBoard}
        changeBoard={props.changeBoard}
      ></AddBoard>{" "}
      <AddTask
        open={addTask}
        setOpen={setAddTask}
        board={props.board}
        addTask={props.addTask}
        category="To do"
      ></AddTask>{" "}
      <AddUser
        board={props.board}
        addUserToBoard={props.addUserToBoard}
      ></AddUser>{" "}
    </div>
  );
}
