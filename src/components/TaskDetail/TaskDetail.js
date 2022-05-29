import React from "react";
import "./TaskDetail.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function TaskDetail(props) {
  // Editable/Users:
  // Change User
  // Change Urgency
  // Change Color
  // Delete Task
  // Move Task to different Cat

  const { open, setOpen, task } = props;
  const [name, setName] = React.useState("");

  console.log(task);
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setName(e.target.value);
    console.log(name);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{task.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{task.urgency}</DialogContentText>
        <DialogContentText>{task.user}</DialogContentText>
        <DialogContentText>{task.category}</DialogContentText>
        <DialogContentText>{task.description}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
