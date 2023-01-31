import React from "react";
import "./AddTask.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { addTask, getUsersFromBoard } from "../../api/apiCalls";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryAddTaskForm,
  setColorAddTaskForm,
  setDescriptionAddTaskForm,
  setUserAddTaskForm,
  setTitleAddTaskForm,
  setUrgencyAddTaskForm,
  resetAddTaskForm,
  setOpenAddTaskDialog,
  useGetAddedUsersQuery,
} from "../../store";

import { useAddTaskMutation } from "../../store";

export default function AddTask(props) {
  const { open } = useSelector((state) => state.addTaskDialog);

  let { user, title, urgency, color, category, description } = useSelector(
    (state) => state.addTaskForm
  );

  let { board } = useSelector((state) => state.activeBoard);
  let { data, isFetching, error } = useGetAddedUsersQuery(board.pk);
  let dispatch = useDispatch();
  let [addTask, results] = useAddTaskMutation();

  // useEffect(() => {
  //   dispatch(setCategoryAddTaskForm(props.category));
  // }, [props.category]);

  const handleClose = async () => {
    let task = {
      title,
      urgency,
      category,
      user_id: user,
      board_id: board.pk,
      color,
      description,
    };

    let newTask = await addTask(task);
    dispatch(setOpenAddTaskDialog(false));
    dispatch(resetAddTaskForm());
  };

  const handleCancel = () => {
    dispatch(setOpenAddTaskDialog(false));
    dispatch(resetAddTaskForm());
  };

  const handleUserChange = (e) => {
    dispatch(setUserAddTaskForm(e.target.value));
  };
  const handleTitleChange = (e) => {
    dispatch(setTitleAddTaskForm(e.target.value));
  };
  const handleCategoryChange = (e) => {
    dispatch(setCategoryAddTaskForm(e.target.value));
  };
  const handleUrgencyChange = (e) => {
    dispatch(setUrgencyAddTaskForm(e.target.value));
  };
  const handleColorChange = (e) => {
    dispatch(setColorAddTaskForm(e.target.value));
  };
  const handleDescriptionChange = (e) => {
    dispatch(setDescriptionAddTaskForm(e.target.value));
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0,0,0,0.15)",
        },
      }}
    >
      <DialogTitle> Add Task </DialogTitle>{" "}
      <DialogContent sx={{ boxShadow: "none !important" }}>
        <DialogContentText>
          Type in your Task Data for your selected Board{" "}
        </DialogContentText>{" "}
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Task Name"
          type="text"
          fullWidth
          required
          variant="standard"
          onChange={handleTitleChange}
          value={title}
        />
        <FormControl sx={{ mt: 2, minWidth: 250, width: "50%" }}>
          <InputLabel htmlFor="select-category"> Category </InputLabel>{" "}
          <Select
            autoFocus
            required
            value={category}
            onChange={handleCategoryChange}
            label="maxWidth"
            inputProps={{
              name: "select-category",
              id: "select-category",
            }}
          >
            <MenuItem value="To do"> To do </MenuItem>{" "}
            <MenuItem value="In progress"> In progress </MenuItem>{" "}
            <MenuItem value="Testing"> Testing </MenuItem>{" "}
            <MenuItem value="Done"> Done </MenuItem>{" "}
          </Select>{" "}
        </FormControl>{" "}
        <FormControl sx={{ mt: 2, minWidth: 250, width: "50%" }}>
          <InputLabel htmlFor="select-urgency"> Urgency </InputLabel>{" "}
          <Select
            autoFocus
            required
            value={urgency}
            onChange={handleUrgencyChange}
            label="maxWidth"
            inputProps={{
              name: "select-urgency",
              id: "select-urgency",
            }}
          >
            <MenuItem value="Nicht Dringend"> Nicht Dringend </MenuItem>{" "}
            <MenuItem value="Dringend"> Dringend </MenuItem>{" "}
            <MenuItem value="Sehr Dringend"> Sehr Dringend </MenuItem>{" "}
          </Select>{" "}
        </FormControl>{" "}
        <FormControl sx={{ mt: 2, mb: 2, minWidth: 250, width: "50%" }}>
          <InputLabel htmlFor="select-user"> User </InputLabel>{" "}
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
                    {" "}
                    {user.fields.first_name + " " + user.fields.last_name}{" "}
                  </MenuItem>
                ))
              : ""}{" "}
          </Select>{" "}
        </FormControl>{" "}
        <FormControl sx={{ mt: 2, mb: 2, minWidth: 250, width: "50%" }}>
          <InputLabel htmlFor="select-color"> Color </InputLabel>{" "}
          <Select
            autoFocus
            required
            value={color}
            onChange={handleColorChange}
            label="maxWidth"
            inputProps={{
              name: "select-color",
              id: "select-color",
            }}
          >
            <MenuItem value="red"> red </MenuItem>{" "}
            <MenuItem value="blue"> blue </MenuItem>{" "}
            <MenuItem value="green"> green </MenuItem>{" "}
            <MenuItem value="yellow"> yellow </MenuItem>{" "}
            <MenuItem value="orange"> orange </MenuItem>{" "}
            <MenuItem value="white"> white </MenuItem>{" "}
          </Select>{" "}
        </FormControl>{" "}
        <TextField
          id="description"
          label="Description"
          placeholder="Type your Description here"
          required
          multiline
          variant="standard"
          fullWidth
          value={description}
          onChange={handleDescriptionChange}
        />{" "}
      </DialogContent>{" "}
      <DialogActions>
        <Button onClick={handleCancel}> Cancel </Button>{" "}
        <Button onClick={handleClose}> Add </Button>{" "}
      </DialogActions>{" "}
    </Dialog>
  );
}
