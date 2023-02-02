import "./MainBoard.css";
import React from "react";
import AddButton from "../AddButton/AddButton.js";
import { Typography } from "@mui/material";
import BoardContainer from "../BoardContainer/BoardContainer";
import TaskDetail from "../TaskDetail/TaskDetail";
import { saveChangeCategory } from "../../api/apiCalls";

import { Navigate, useParams } from "react-router-dom";
import NoBoards from "../NoBoards/NoBoards";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenTaskDetailDialog,
  setSelectedTask,
  useChangeCategoryMutation,
  useFetchTasksQuery,
  setActiveBoard,
  useFetchBoardsQuery,
} from "../../store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MainBoard(props) {
  let categories = ["To do", "In progress", "Testing", "Done"];
  let { boardId } = useParams();
  let navigate = useNavigate();
  const navigateTo = (id) => navigate("/" + id);

  let { board } = useSelector((state) => state.activeBoard);
  let { token, loggedIn } = useSelector((state) => state.loggedIn);
  let dispatch = useDispatch();

  let boardData = useFetchBoardsQuery(token);

  let mainContent;
  if (boardData.isFetching) {
    mainContent = <div> Loading</div>;
  } else if (boardData.error) {
    mainContent = <div>Error fetching Boards</div>;
  } else if (boardData.data.length > 0) {
    let [matchedBoard] = boardData.data.filter((board) => board.pk == boardId); // Works only because of ==
    if (matchedBoard) {
      dispatch(setActiveBoard(matchedBoard));
    } else {
      dispatch(setActiveBoard(boardData.data[0])); // --> no fake refetches
      navigateTo(boardData.data[0].pk);
    }

    mainContent = (
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
  } else {
    mainContent = (
      <div>
        <NoBoards />
      </div>
    );
  }

  return <div> {mainContent} </div>;
}

export default MainBoard;
