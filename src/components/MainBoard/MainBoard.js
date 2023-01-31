import "./MainBoard.css";
import React from "react";
import AddButton from "../AddButton/AddButton.js";
import { Typography } from "@mui/material";
import BoardContainer from "../BoardContainer/BoardContainer";
import TaskDetail from "../TaskDetail/TaskDetail";
import { saveChangeCategory } from "../../api/apiCalls";

import { Navigate } from "react-router-dom";
import NoBoards from "../NoBoards/NoBoards";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenTaskDetailDialog,
  setSelectedTask,
  useChangeCategoryMutation,
  useFetchTasksQuery,
} from "../../store";
import { useState } from "react";

function MainBoard(props) {
  let categories = ["To do", "In progress", "Testing", "Done"];

  let { board } = useSelector((state) => state.activeBoard);

  let { data, isFetching, error } = useFetchTasksQuery(board.pk);

  let getTasksOfCategory = (cat) => {
    if (isFetching || error) {
      return [];
    } else {
      let tasks = data.filter((task) => task.fields.category == cat);
      return tasks;
    }
  };

  return (
    <div>
      {" "}
      {props.loggedIn ? (
        <div>
          {" "}
          {
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
                    return (
                      <BoardContainer
                        key={cat}
                        title={cat}
                        tasks={getTasksOfCategory(cat)}
                      />
                    );
                  })}{" "}
                </div>{" "}
              </div>{" "}
              <TaskDetail></TaskDetail>{" "}
            </div>
          }{" "}
        </div>
      ) : (
        <Navigate to="/login" />
      )}{" "}
    </div>
  );
}

export default MainBoard;
