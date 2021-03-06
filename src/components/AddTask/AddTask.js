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

export default function AddTask(props) {
  const { open, setOpen } = props;
  const [user, setUser] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [urgency, setUrgency] = React.useState("");
  const [color, setColor] = React.useState("white");
  const [category, setCategory] = React.useState(props.category);
  const [possibleUsers, setPossibleUsers] = React.useState([]);
  const [description, setDescription] = React.useState("");

  useEffect(() => {
    getUsersFromBoard(props.board.pk).then((result) => {
      setPossibleUsers(result);
    });
  }, [props.board]);

  const handleClose = () => {
    addTask(
      title,
      urgency,
      category,
      user,
      props.board.pk,
      color,
      description
    ).then((result) => {
      let [task] = result;
      props.addTask(task);
      setOpen(false);
      resetState();
    });
  };

  const handleCancel = () => {
    setOpen(false);
    resetState();
  };
  const resetState = () => {
    setUser("");
    setTitle("");
    setDescription("");
    setColor("white");
    setCategory(props.category);
    setUrgency("");
  };

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleUrgencyChange = (e) => {
    setUrgency(e.target.value);
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle> Add Task </DialogTitle>{" "}
      <DialogContent>
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
            {possibleUsers.map((user) => (
              <MenuItem key={user.pk} value={user.pk}>
                {" "}
                {user.fields.first_name + " " + user.fields.last_name}{" "}
              </MenuItem>
            ))}{" "}
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
