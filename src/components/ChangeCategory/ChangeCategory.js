import "./ChangeCategory.css";
import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { saveChangeCategory } from "../../api/apiCalls";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryChangeCategoryForm, setTaskCategory } from "../../store";
import { useEffect } from "react";
import {
  setOpenChangeCategoryDialog,
  useChangeCategoryMutation,
} from "../../store";

export default function ChangeCategory() {
  const { task } = useSelector((state) => state.selectedTask);

  const { category } = useSelector((state) => state.changeCategoryForm);
  let { token } = useSelector((state) => state.loggedIn);

  const { open } = useSelector((state) => state.changeCategoryDialog);
  const dispatch = useDispatch();

  let [changeCategory, results] = useChangeCategoryMutation();

  useEffect(() => {
    dispatch(setCategoryChangeCategoryForm(task.fields.category));
  }, []);

  const handleClose = async () => {
    let data = { task_id: task.pk, newCategory: category, token };
    let newCategory = await changeCategory(data);
    dispatch(setTaskCategory(category)); //um State zu aktualisieren
    resetState();
    dispatch(setOpenChangeCategoryDialog(false));
  };

  const handleCategoryChange = (e) => {
    dispatch(setCategoryChangeCategoryForm(e.target.value));
  };

  const handleCancel = () => {
    dispatch(setOpenChangeCategoryDialog(false));
    resetState();
  };
  const resetState = () => {
    dispatch(setCategoryChangeCategoryForm(task.fields.category));
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Change Category</DialogTitle>
      <DialogContent>
        <FormControl sx={{ mt: 2, minWidth: 250 }}>
          <InputLabel htmlFor="select-category">Category</InputLabel>
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
            <MenuItem value="To do">To do</MenuItem>
            <MenuItem value="In progress">In progress</MenuItem>
            <MenuItem value="Testing">Testing </MenuItem>
            <MenuItem value="Done">Done</MenuItem>
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
