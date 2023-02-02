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
import { useSelector, useDispatch } from "react-redux";
import {
  setUserChangeUserForm,
  setOpenChangeUserDialog,
  useChangeUserMutation,
  useGetAddedUsersQuery,
  setTaskUser,
} from "../../store";

export default function ChangeUser() {
  const { board } = useSelector((state) => state.activeBoard);

  const { task } = useSelector((state) => state.selectedTask);
  let { token } = useSelector((state) => state.loggedIn);

  let { data, isFecthing, error } = useGetAddedUsersQuery({
    board_id: board.pk,
    token,
  });

  const { user } = useSelector((state) => state.changeUserForm);
  const { open } = useSelector((state) => state.changeUserDialog);

  const dispatch = useDispatch();

  const [changeUser, result] = useChangeUserMutation();

  useEffect(() => {
    dispatch(setUserChangeUserForm(task.fields.user));
  }, []);

  const handleClose = async () => {
    let data = { task_id: task.pk, newUser: user, token };
    let newUser = await changeUser(data);
    dispatch(setTaskUser(user));

    resetState();
    dispatch(setOpenChangeUserDialog(false));
  };
  const handleUserChange = (e) => {
    dispatch(setUserChangeUserForm(e.target.value));
  };
  const handleCancel = () => {
    dispatch(setOpenChangeUserDialog(false));
    resetState();
  };
  const resetState = () => {
    dispatch(setUserChangeUserForm(task.fields.user));
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
            {data
              ? data.map((user) => (
                  <MenuItem key={user.pk} value={user.pk}>
                    {user.fields.first_name + " " + user.fields.last_name}
                  </MenuItem>
                ))
              : ""}
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
