import "./AddBoard.css";
import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { addBoard } from "../../api/apiCalls";

export default function AddBoard(props) {
  const { open, setOpen } = props;
  const [name, setName] = React.useState("");

  const handleClose = () => {
    addBoard(name).then((result) => {
      console.log("Added Board ", result);
      let [board] = result;
      props.addBoard(board);
      props.changeBoard(board);
      setOpen(false);
      resetState();
    });
  };

  const handleCancel = () => {
    console.log("In handle Cancel");
    setOpen(false);
    resetState();
  };
  const resetState = () => {
    setName("");
  };

  const handleChange = (e) => {
    setName(e.target.value);
    console.log(name);
  };
  return (
    <Dialog open={open} onClose={handleCancel}>
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
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleClose}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
