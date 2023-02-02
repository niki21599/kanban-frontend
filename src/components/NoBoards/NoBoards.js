import React from "react";

import AddBoard from "../AddBoard/AddBoard";
import { Button } from "@mui/material";
import { Card, Typography } from "@mui/material";

import { useDispatch } from "react-redux";
import { setOpenAddBoardDialog } from "../../store";

export default function NoBoards(props) {
  const dispatch = useDispatch();

  let openAddBoardDialog = () => {
    dispatch(setOpenAddBoardDialog(true));
  };

  return (
    <div>
      {
        <div>
          <Card
            sx={{
              maxWidth: 300,
              position: "absolute",
              top: 100,
              left: "calc(50vw - 150px)",
            }}
          >
            <Typography variant="h6" sx={{ mt: 2, ml: 2, mr: 2, mb: 2 }}>
              You have no boards added yet. Please add a board.
            </Typography>

            <Button
              variant="contained"
              onClick={openAddBoardDialog}
              sx={{ mt: 2, ml: "50px", mr: "50px", mb: 2, width: "200px" }}
              fullWidth
            >
              Add Board
            </Button>
          </Card>
          <AddBoard />
        </div>
      }
    </div>
  );
}
