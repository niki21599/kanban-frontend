import React from "react";
import "./ChangeUrgency.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { saveChangeUrgency } from "../../api/apiCalls";

export default function ChangeUrgency(props) {
  const { open, setOpen, task, changeUrgency } = props;
  const [urgency, setUrgency] = React.useState(task.fields.urgency);

  const handleClose = () => {
    changeUrgency(task.pk, urgency);
    saveChangeUrgency(task.pk, urgency).then((result) => {
      setOpen(false);
      resetState();
    });
  };
  const handleUrgencyChange = (e) => {
    setUrgency(e.target.value);
  };
  const handleCancel = () => {
    setOpen(false);
    resetState();
  };
  const resetState = () => {
    setUrgency(task.fields.urgency);
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
          <InputLabel htmlFor="select-urgency">Urgency</InputLabel>
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
            <MenuItem value="Nicht Dringend">Nicht Dringend</MenuItem>
            <MenuItem value="Dringend">Dringend</MenuItem>
            <MenuItem value="Sehr Dringend">Sehr Dringend</MenuItem>
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
