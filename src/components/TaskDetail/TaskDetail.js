import React, { useEffect, useState } from "react";
import "./TaskDetail.css";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import TimerIcon from "@mui/icons-material/Timer";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ChangeUser from "../ChangeUser/ChangeUser";
import ChangeCategory from "../ChangeCategory/ChangeCategory";
import ChangeUrgency from "../ChangeUrgency/ChangeUrgency";
import DeleteTask from "../DeleteTask/DeleteTask";
import { getUser } from "../../api/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenChangeCategoryDialog,
  setOpenChangeUrgencyDialog,
  setOpenChangeUserDialog,
  setOpenDeleteTaskDialog,
  setOpenTaskDetailDialog,
} from "../../store";

export default function TaskDetail() {
  const { task } = useSelector((state) => state.selectedTask);
  const [name, setName] = useState(""); // ok

  let { open } = useSelector((state) => state.taskDetailDialog);
  let dispatch = useDispatch();

  useEffect(() => {
    if (task.fields.user) {
      getUserById(task.fields.user);
    }
  });

  const handleClose = () => {
    dispatch(setOpenTaskDetailDialog(false));
  };

  const deleteTaskOpen = () => {
    dispatch(setOpenDeleteTaskDialog(true));
  };
  const handleUserOpen = () => {
    dispatch(setOpenChangeUserDialog(true));
  };

  const handleCatOpen = () => {
    dispatch(setOpenChangeCategoryDialog(true));
  };

  const handleUrgencyOpen = () => {
    dispatch(setOpenChangeUrgencyDialog(true));
  };

  const getUserById = (pk) => {
    getUser(pk).then((result) => {
      let [user] = result;
      setName(user.fields.first_name + " " + user.fields.last_name);
    });
  };

  return (
    <div className="relative">
      <Dialog open={open} onClose={handleClose}>
        <ChangeUser></ChangeUser>
        <ChangeCategory></ChangeCategory>
        <ChangeUrgency></ChangeUrgency>
        <DeleteTask></DeleteTask>
        <Fab
          variant="extended"
          onClick={handleUserOpen}
          className="user-responsive"
          sx={{ position: "absolute", left: "105%", top: "0px" }}
        >
          <PersonOutlineIcon sx={{ mr: 1 }} />
          Change User
        </Fab>
        <Fab
          variant="extended"
          sx={{ position: "absolute", left: "105%", top: "60px" }}
          className="urgency-responsive"
          onClick={handleUrgencyOpen}
        >
          <TimerIcon sx={{ mr: 1 }} />
          Change Urgency
        </Fab>
        <Fab
          variant="extended"
          className="delete-responsive"
          sx={{ position: "absolute", left: "105%", top: "120px" }}
          onClick={deleteTaskOpen}
        >
          <DeleteIcon sx={{ mr: 1 }} />
          Delete Task
        </Fab>
        <Fab
          className="move-responsive"
          variant="extended"
          sx={{ position: "absolute", left: "105%", top: "180px" }}
          //sx={{ position: "absolute", top: "-60px", left: "185px" }}
          onClick={handleCatOpen}
        >
          <ArrowForwardIcon sx={{ mr: 1 }} />
          Move
        </Fab>

        <Card>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <CardContent sx={{ minWidth: 275, minHeight: 190, maxWidth: 300 }}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {task.fields.category}
            </Typography>
            <Typography variant="h5" component="div">
              {task.fields.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {task.fields.urgency}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {name}
            </Typography>
            <Typography paragraph className="with-breaks" variant="body2">
              {task.fields.description}
            </Typography>
          </CardContent>
        </Card>
      </Dialog>
    </div>
  );
}
{
  /* <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>{task.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{task.urgency}</DialogContentText>
        <DialogContentText>{task.user}</DialogContentText>
        <DialogContentText>{task.category}</DialogContentText>
        <DialogContentText>{task.description}</DialogContentText>
      </DialogContent> */
}
