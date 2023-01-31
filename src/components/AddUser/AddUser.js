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
import { addUserToBoard, getUsersNotAddedToBoard } from "../../api/apiCalls";
import { useSelector, useDispatch } from "react-redux";
import { setOpenAddUserDialog, setCheckedAddUserForm } from "../../store";
import { useAddUsersToBoardMutation } from "../../store";

export default function AddUser(props) {
  const { board } = useSelector((state) => state.activeBoard);
  const [possibleUsers, setPossibleUsers] = React.useState([]);

  const { open } = useSelector((state) => state.addUserDialog);
  const { checked } = useSelector((state) => state.addUserForm);

  const dispatch = useDispatch();
  let [addUsersToBoard, results] = useAddUsersToBoardMutation();

  useEffect(() => {
    getUsersNotAddedToBoard(board.pk).then((result) => {
      setPossibleUsers(result);
      let newChecked = new Array(possibleUsers.length).fill(false);
      dispatch(setCheckedAddUserForm(newChecked));
    });
  }, [board]);

  const handleClose = () => {
    let user_ids = [];
    for (let index = 0; index < possibleUsers.length; index++) {
      const element = checked[index];
      if (element) {
        user_ids.push(possibleUsers[index].pk);
      }
    }

    console.log("Data", board.pk, user_ids);
    let boardAndUser = { board_id: board.pk, user_ids };
    addUsersToBoard(boardAndUser);
    //props.addUserToBoard(user_ids);
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

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle> Add User </DialogTitle>{" "}
      <DialogContent>
        <DialogContentText>
          Select the Users you would like to add.{" "}
        </DialogContentText>{" "}
        <FormGroup>
          {" "}
          {possibleUsers.length > 0
            ? possibleUsers.map((user, index) => (
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
              ))
            : ""}{" "}
        </FormGroup>{" "}
      </DialogContent>{" "}
      <DialogActions>
        <Button onClick={handleCancel}> Cancel </Button>{" "}
        <Button onClick={handleClose}> Add </Button>{" "}
      </DialogActions>{" "}
    </Dialog>
  );
}
