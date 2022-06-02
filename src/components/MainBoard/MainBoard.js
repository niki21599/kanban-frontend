import "./MainBoard.css";
import React from "react";
import AddButton from "../AddButton/AddButton.js";
import { Typography } from "@mui/material";
import BoardContainer from "../BoardContainer/BoardContainer";
import TaskDetail from "../TaskDetail/TaskDetail";
import { saveChangeCategory } from "../../api/apiCalls";

import { Navigate } from "react-router-dom";
import NoBoards from "../NoBoards/NoBoards";

class MainBoard extends React.Component {
  categories = ["To do", "In progress", "Testing", "Done"];
  dummyTask = {
    fields: {
      user: 1,
      title: "hfjds",
      category: "hjfkd",
      urgency: "jkds",
      color: "jfsk",
    },
  };

  state = {
    currentDraggedElement: 0,
    openDetail: false,
    pickedTask: this.dummyTask,
  };

  openTaskDetail = (id) => {
    let [pickedTask] = this.props.tasks.filter((task) => task.pk == id);
    this.setState({
      pickedTask: pickedTask,
      openDetail: true,
    });
  };
  setOpenDetail = (bool) => {
    this.setState({ openDetail: bool });
  };

  changeDraggedElement = (id) => {
    this.setState({ currentDraggedElement: id });
  };

  getTasksOfCategory = (cat) => {
    let tasks = this.props.tasks.filter((task) => task.fields.category == cat);
    return tasks;
  };
  changeCategory = (cat) => {
    let items = this.props.tasks;
    let [item] = items.filter(
      (item) => this.state.currentDraggedElement === item.pk
    );
    let leftItems = items.filter(
      (item) => this.state.currentDraggedElement !== item.pk
    );

    item.fields.category = cat;
    leftItems.push(item);
    this.props.handleChangeCat(leftItems);

    saveChangeCategory(item.pk, item.fields.category);
  };

  render() {
    return (
      <div>
        {" "}
        {this.props.loggedIn ? (
          <div>
            {" "}
            {this.props.boardsAdded ? (
              <div>
                <AddButton
                  addBoard={this.props.addBoard}
                  board={this.props.board}
                  addTask={this.props.addTask}
                  addUserToBoard={this.props.addUserToBoard}
                  changeBoard={this.props.changeBoard}
                  boardsAdded={this.props.boardsAdded}
                />{" "}
                <div className="mainContainer">
                  <div className="headlineContainer">
                    <Typography align="center" variant="h4">
                      {" "}
                      {this.props
                        ? this.props.board.fields.name
                        : "Board Name"}{" "}
                    </Typography>{" "}
                  </div>{" "}
                  <div className="board">
                    {" "}
                    {this.categories.map((cat) => {
                      return (
                        <BoardContainer
                          key={cat}
                          title={cat}
                          tasks={this.getTasksOfCategory(cat)}
                          changeDraggedElement={this.changeDraggedElement}
                          changeCategory={this.changeCategory}
                          openDetail={this.openTaskDetail}
                          board={this.props.board}
                          addTask={this.props.addTask}
                        />
                      );
                    })}{" "}
                  </div>{" "}
                </div>{" "}
                <TaskDetail
                  open={this.state.openDetail}
                  setOpen={this.setOpenDetail}
                  task={this.state.pickedTask}
                  setOpenDetail={this.setOpenDetail}
                  handleChangeCatWithOne={this.props.handleChangeCatWithOne}
                  changeUrgency={this.props.changeUrgency}
                  changeUser={this.props.changeUser}
                  board={this.props.board}
                  deleteTask={this.props.deleteTask}
                ></TaskDetail>{" "}
              </div>
            ) : (
              <NoBoards
                changeBoard={this.props.changeBoard}
                addBoard={this.props.addBoard}
              />
            )}{" "}
          </div>
        ) : (
          <Navigate to="/login" />
        )}{" "}
      </div>
    );
  }
}

export default MainBoard;
