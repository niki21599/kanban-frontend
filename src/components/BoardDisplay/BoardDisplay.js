import React from "react";
import AddButton from "../AddButton/AddButton.js";
import { Typography } from "@mui/material";
import BoardContainer from "../BoardContainer/BoardContainer";
import TaskDetail from "../TaskDetail/TaskDetail";
import { useSelector } from "react-redux";

export default function BoardDisplay() {
  let categories = ["To do", "In progress", "Testing", "Done"];
  let { board } = useSelector((state) => state.activeBoard);

  return (
    <div>
      {" "}
      <div>
        <AddButton />{" "}
        <div className="mainContainer">
          <div className="headlineContainer">
            <Typography align="center" variant="h4">
              {" "}
              {board ? board.fields.name : "Board Name"}{" "}
            </Typography>{" "}
          </div>{" "}
          <div className="board">
            {" "}
            {categories.map((cat) => {
              return <BoardContainer key={cat} title={cat} />;
            })}{" "}
          </div>{" "}
        </div>{" "}
        <TaskDetail></TaskDetail>{" "}
      </div>{" "}
    </div>
  );
}
