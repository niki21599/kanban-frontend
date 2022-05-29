import React from "react";
import "./AddUser.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function AddUser(props) {
  const { open, setOpen } = props;

  const users = ["Niklas", "Tim", "Julian"];
  // useState auch mit APICall verknüpfen

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    //setChecked(event.target.checked);
    // Controlled Checkbox:
    // <Checkbox
    //   checked={checked}
    //   onChange={handleChange}
    //   inputProps={{ 'aria-label': 'controlled' }}
    // />
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select the Users you would like to add.
        </DialogContentText>
        <FormGroup>
          {users.map((user) => (
            <FormControlLabel key={user} control={<Checkbox />} label={user} />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
