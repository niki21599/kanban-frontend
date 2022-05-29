import "./AddBoard.css";
import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddBoard(props) {
  const { open, setOpen } = props;
  const [name, setName] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setName(e.target.value);
    console.log(name);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Board</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please type in a name for your Board. You can add Users later on in
          the Dashboard
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Board Name"
          type="text"
          fullWidth
          required
          value={name}
          variant="standard"
          onChange={(e) => handleChange(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
