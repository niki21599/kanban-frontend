import "./AddBoard.css";
import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
  setNameAddBoardForm,
  setOpenAddBoardDialog,
  useAddBoardMutation,
} from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AddBoard(props) {
  const { open } = useSelector((state) => state.addBoardDialog);
  let { name } = useSelector((state) => state.addBoardForm);
  let { token } = useSelector((state) => state.loggedIn);

  let navigate = useNavigate();
  let navigateTo = (board_id) => navigate("/" + board_id);

  let dispatch = useDispatch();
  let [addBoard] = useAddBoardMutation();

  const handleClose = async () => {
    let { data } = await addBoard({ name, token });
    let newBoard = data[0];
    let board_id = newBoard.pk;
    navigateTo(board_id);
    dispatch(setOpenAddBoardDialog(false));
    resetState();
  };

  const handleCancel = () => {
    dispatch(setOpenAddBoardDialog(false));
    resetState();
  };
  const resetState = () => {
    dispatch(setNameAddBoardForm(""));
  };

  const handleChange = (e) => {
    dispatch(setNameAddBoardForm(e.target.value));
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
