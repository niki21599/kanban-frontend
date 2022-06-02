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

export default function ChangeCategory(props) {
  const { open, setOpen, task, handleChangeCatWithOne } = props;
  const [category, setCategory] = React.useState(task.fields.category);

  const handleClose = () => {
    handleChangeCatWithOne(task.pk, category);
    saveChangeCategory(task.pk, category).then((result) => {
      resetState();
      return setOpen(false);
    });
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleCancel = () => {
    setOpen(false);
    resetState();
  };
  const resetState = () => {
    setCategory(task.fields.category);
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
