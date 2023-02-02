import React, { useEffect } from "react";
import "./AddUser.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import { setOpenAddUserDialog, setCheckedAddUserForm } from "../../store";
import {
  useAddUsersToBoardMutation,
  useGetNotAddedUsersQuery,
} from "../../store";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function AddUser(props) {
  const { board } = useSelector((state) => state.activeBoard);
  const { open } = useSelector((state) => state.addUserDialog);
  const { checked } = useSelector((state) => state.addUserForm);
  const { token } = useSelector((state) => state.loggedIn);

  const dispatch = useDispatch();
  let [addUsersToBoard] = useAddUsersToBoardMutation();

  let { data, isFetching, error } = useGetNotAddedUsersQuery({
    board_id: board.pk,
    token,
  });

  useEffect(() => {
    if (data) {
      let newChecked = new Array(data.length).fill(false);
      dispatch(setCheckedAddUserForm(newChecked));
    }
  }, [board]);

  const handleClose = () => {
    let user_ids = [];
    for (let index = 0; index < data.length; index++) {
      const element = checked[index];
      if (element) {
        user_ids.push(data[index].pk);
      }
    }
    let boardAndUser = { board_id: board.pk, user_ids, token };
    addUsersToBoard(boardAndUser);
    dispatch(setOpenAddUserDialog(false));
    resetState();
  };

  const handleCancel = () => {
    dispatch(setOpenAddUserDialog(false));
    resetState();
  };
  const resetState = () => {
    dispatch(setCheckedAddUserForm([]));
  };
  const handleChange = (event, index) => {
    let items = [...checked];
    let item = { ...items[index] };
    item = event.target.checked;
    items[index] = item;
    dispatch(setCheckedAddUserForm(items));
  };

  let usersList;
  if (isFetching) {
    usersList = (
      <div>
        {" "}
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    usersList = <div> Error </div>;
  }
  if (data) {
    usersList = data.map((user, index) => (
      <FormControlLabel
        key={user.pk}
        control={
          <Checkbox
            checked={checked[index] ? checked[index] : false}
            onChange={(event) => handleChange(event, index)}
          />
        }
        value={user.pk}
        label={user.fields.first_name + " " + user.fields.last_name}
      />
    ));
  }

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle> Add User </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select the Users you would like to add.
        </DialogContentText>
        <FormGroup> {usersList} </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}> Cancel </Button>
        <Button onClick={handleClose}> Add </Button>
      </DialogActions>
    </Dialog>
  );
}
