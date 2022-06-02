import React from "react";
import "./DeleteTask.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { deleteTask } from "../../api/apiCalls";

export default function DeleteTask(props) {
  const { open, setOpen, task } = props;

  const handleClose = () => {
    props.deleteTask(task.pk);
    deleteTask(task.pk).then((result) => {
      setOpen(false);
    });
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Would you like to delete the Task <strong>{task.fields.title}</strong>
          ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleClose} autoFocus>
          Delete Task
        </Button>
      </DialogActions>
    </Dialog>
  );
}
