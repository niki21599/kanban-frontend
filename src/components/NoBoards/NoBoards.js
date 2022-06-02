import React from "react";

import AddBoard from "../AddBoard/AddBoard";
import { Button } from "@mui/material";
import { Card, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function NoBoards(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  let openDialog = () => {
    setOpen(true);
  };
  setTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <div>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
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
              You have no Boards added yet. Please add a board.
            </Typography>

            <Button
              variant="contained"
              onClick={openDialog}
              sx={{ mt: 2, ml: "50px", mr: "50px", mb: 2, width: "200px" }}
              fullWidth
            >
              Add Board
            </Button>
          </Card>

          <AddBoard
            open={open}
            setOpen={setOpen}
            addBoard={props.addBoard}
            changeBoard={props.changeBoard}
          ></AddBoard>
        </div>
      )}
    </div>
  );
}
