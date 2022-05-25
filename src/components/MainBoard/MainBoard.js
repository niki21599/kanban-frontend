import "./MainBoard.css";
import React from "react";
import AddButton from "../AddButton/AddButton.js";
import { Typography } from "@mui/material";
import BoardContainer from "../BoardContainer/BoardContainer";

class MainBoard extends React.Component {
  categories = ["Todo", "In progress", "Testing", "Done"];
  state = {
    tasks: [
      { id: 1, title: "Test", category: "Todo" },
      { id: 0, title: "Test1", category: "Todo" },
      { id: 2, title: "Test2", category: "In progress" },
    ],
    currentDraggedElement: 0,
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
              Board Name
            </Typography>
          </div>
          <div className="board">
            {this.categories.map((cat) => (
              <BoardContainer
                key={cat}
                title={cat}
                tasks={this.getTasks(cat)}
                changeDraggedElement={this.changeDraggedElement}
                changeCategory={this.changeCategory}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default MainBoard;
