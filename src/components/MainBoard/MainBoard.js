import "./MainBoard.css";
import React from "react";
import AddButton from "../AddButton/AddButton.js";
import { Typography } from "@mui/material";
import BoardContainer from "../BoardContainer/BoardContainer";
import TaskDetail from "../TaskDetail/TaskDetail";

class MainBoard extends React.Component {
  categories = ["To do", "In progress", "Testing", "Done"];
  state = {
    tasks: [
      {
        id: 1,
        title: "Test",
        category: "To do",
        urgency: "Sehr Dringend",
        description:
          "loreflksdajfklsnfjksfnkjasdnfsnfjksnkk  fd fjks fsdjf kjsdf jkf",
        user: "Niklas",
      },
      {
        id: 0,
        title: "Test1",
        category: "To do",
        urgency: "Sehr Dringend",
        description:
          "loreflksdajfklsnfjksfnkjasdnfsnfjksnkk  fd fjks fsdjf kjsdf jkf",
        user: "Niklas",
      },
      {
        id: 2,
        title: "Test2",
        category: "In progress",
        urgency: "Sehr Dringend",
        description:
          "loreflksdajfklsnfjksfnkjasdnfsnfjksnkk  fd fjks fsdjf kjsdf jkf",
        user: "Niklas",
      },
    ],
    currentDraggedElement: 0,
    openDetail: false,
    pickedTask: {},
  };

  openTaskDetail = (id) => {
    console.log(id);
    let [pickedTask] = this.state.tasks.filter((task) => task.id == id);
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

  getTasks = (cat) => {
    let tasks = this.state.tasks.filter((task) => task.category == cat);
    return tasks;
  };
  changeCategory = (cat) => {
    console.log("Die Category ist: ", cat);
    console.log("Das Element ist: ", this.state.currentDraggedElement);
    let items = this.state.tasks;
    let [item] = items.filter(
      (item) => this.state.currentDraggedElement === item.id
    );
    let leftItems = items.filter(
      (item) => this.state.currentDraggedElement !== item.id
    );

    item.category = cat;
    leftItems.push(item);
    this.setState(leftItems);
  };

  render() {
    return (
      <div>
        <AddButton />
        <div className="mainContainer">
          <div className="headlineContainer">
            <Typography align="center" variant="h4">
              Board Name{" "}
            </Typography>{" "}
          </div>{" "}
          <div className="board">
            {" "}
            {this.categories.map((cat) => (
              <BoardContainer
                key={cat}
                title={cat}
                tasks={this.getTasks(cat)}
                changeDraggedElement={this.changeDraggedElement}
                changeCategory={this.changeCategory}
                openDetail={this.openTaskDetail}
              />
            ))}{" "}
          </div>{" "}
        </div>{" "}
        <TaskDetail
          open={this.state.openDetail}
          setOpen={this.setOpenDetail}
          task={this.state.pickedTask}
        ></TaskDetail>
      </div>
    );
  }
}

export default MainBoard;
