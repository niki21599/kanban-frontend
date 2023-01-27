import "./MainBoard.css";
import React from "react";
import AddButton from "../AddButton/AddButton.js";
import { Typography } from "@mui/material";
import BoardContainer from "../BoardContainer/BoardContainer";
import TaskDetail from "../TaskDetail/TaskDetail";
import { saveChangeCategory } from "../../api/apiCalls";

import { Navigate } from "react-router-dom";
import NoBoards from "../NoBoards/NoBoards";
import { useDispatch } from "react-redux";
import { setOpenTaskDetailDialog } from "../../store";
import { useState } from "react";

function MainBoard(props) {
  let categories = ["To do", "In progress", "Testing", "Done"];
  let dummyTask = {
    fields: {
      user: 1,
      title: "hfjds",
      category: "hjfkd",
      urgency: "jkds",
      color: "jfsk",
    },
  };

  let dispatch = useDispatch();

  let [currentDraggedElement, setCurrentDraggedElement] = useState(0);
  let [pickedTask, setPickedTask] = useState(dummyTask);

  let openTaskDetail = (id) => {
    let [pickedTask] = props.tasks.filter((task) => task.pk == id);
    setPickedTask(pickedTask);

    dispatch(setOpenTaskDetailDialog(true));
  };

  let changeDraggedElement = (id) => {
    setCurrentDraggedElement(id);
  };

  let getTasksOfCategory = (cat) => {
    let tasks = props.tasks.filter((task) => task.fields.category == cat);
    return tasks;
  };
  let changeCategory = (cat) => {
    let items = props.tasks;
    let [item] = items.filter((item) => currentDraggedElement === item.pk);
    let leftItems = items.filter((item) => currentDraggedElement !== item.pk);

    item.fields.category = cat;
    leftItems.push(item);
    props.handleChangeCat(leftItems);

    saveChangeCategory(item.pk, item.fields.category);
  };

  return (
    <div>
      {" "}
      {props.loggedIn ? (
        <div>
          {" "}
          {props.boardsAdded ? (
            <div>
              <AddButton
                addBoard={props.addBoard}
                board={props.board}
                addTask={props.addTask}
                addUserToBoard={props.addUserToBoard}
                changeBoard={props.changeBoard}
                boardsAdded={props.boardsAdded}
              />{" "}
              <div className="mainContainer">
                <div className="headlineContainer">
                  <Typography align="center" variant="h4">
                    {" "}
                    {props ? props.board.fields.name : "Board Name"}{" "}
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
                        changeDraggedElement={changeDraggedElement}
                        changeCategory={changeCategory}
                        openDetail={openTaskDetail}
                        board={props.board}
                        addTask={props.addTask}
                      />
                    );
                  })}{" "}
                </div>{" "}
              </div>{" "}
              <TaskDetail
                task={pickedTask}
                handleChangeCatWithOne={props.handleChangeCatWithOne}
                changeUrgency={props.changeUrgency}
                changeUser={props.changeUser}
                board={props.board}
                deleteTask={props.deleteTask}
              ></TaskDetail>{" "}
            </div>
          ) : (
            <NoBoards
              changeBoard={props.changeBoard}
              addBoard={props.addBoard}
            />
          )}{" "}
        </div>
      ) : (
        <Navigate to="/login" />
      )}{" "}
    </div>
  );
}

export default MainBoard;
