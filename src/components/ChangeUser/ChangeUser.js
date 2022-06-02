import React, { useEffect } from "react";
import "./ChangeUser.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { getUsersFromBoard, saveChangeUser } from "../../api/apiCalls";

export default function ChangeUser(props) {
  const { open, setOpen, task, changeUser, board } = props;
  const [user, setUser] = React.useState(task.fields.user);
  const [possibleUsers, setPossibleUsers] = React.useState([]);

  useEffect(() => {
    getUsersFromBoard(board.pk).then((result) => {
      setPossibleUsers(result);
    });
  }, [board]);

  const handleClose = () => {
    changeUser(task.pk, user);
    saveChangeUser(task.pk, user).then((result) => {
      resetState();
      setOpen(false);
    });
  };
  const handleUserChange = (e) => {
    setUser(e.target.value);
  };
  const handleCancel = () => {
    setOpen(false);
    resetState();
  };
  const resetState = () => {
    setUser(task.fields.user);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Change User</DialogTitle>
      <DialogContent>
        <FormControl sx={{ mt: 2, minWidth: 250 }}>
          <InputLabel htmlFor="select-user">User</InputLabel>
          <Select
            autoFocus
            required
            value={user}
            onChange={handleUserChange}
            label="maxWidth"
            inputProps={{
              name: "select-user",
              id: "select-user",
            }}
          >
            {possibleUsers.map((user) => (
              <MenuItem key={user.pk} value={user.pk}>
                {user.fields.first_name + " " + user.fields.last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleClose} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
