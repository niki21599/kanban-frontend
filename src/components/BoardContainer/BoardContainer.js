import React from "react";
import "./BoardContainer.css";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Task from "../Task/Task";
import AddTask from "../AddTask/AddTask";
import { setOpenAddTaskDialog } from "../../store";
import { useDispatch } from "react-redux";

export default function BoardContainer(props) {
  let dispatch = useDispatch();

  let moveTo = (category) => {
    props.changeCategory(category);
  };
  let allowDrop = (event) => {
    event.preventDefault();
  };

  const handleAddTask = () => {
    dispatch(setOpenAddTaskDialog(true));
  };
  return (
    <div className="boardContainer" id={props.title}>
      <div className="heading">
        <Typography align="left" variant="h5">
          {" "}
          {props.title}{" "}
        </Typography>{" "}
        <IconButton className="whiteButton" onClick={handleAddTask}>
          <AddIcon />
        </IconButton>{" "}
      </div>{" "}
      <div
        className="task-Section"
        onDrop={() => moveTo(props.title)}
        onDragOver={(event) => allowDrop(event)}
      >
        {props.tasks.map((task) => (
          <Task
            task={task}
            key={task.pk}
            changeDraggedElement={props.changeDraggedElement}
            openDetail={props.openDetail}
          />
        ))}{" "}
      </div>{" "}
      <AddTask
        category={props.title}
        board={props.board}
        addTask={props.addTask}
      ></AddTask>{" "}
    </div>
  );
}
