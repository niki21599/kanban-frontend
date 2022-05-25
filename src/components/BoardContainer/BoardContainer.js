import React from "react";
import "./BoardContainer.css";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AddIcon from "@mui/icons-material/Add";
import Task from "../Task/Task";

export default function BoardContainer(props) {
  let moveTo = (category) => {
    props.changeCategory(category);
  };
  let allowDrop = (event) => {
    event.preventDefault();
  };
  return (
    <div className="boardContainer" id={props.title}>
      <div className="heading">
        <Typography align="left" variant="h5">
          {props.title}
        </Typography>
        <IconButton>
          <AddIcon />
        </IconButton>
      </div>
      <div
        className="task-Section"
        onDrop={() => moveTo(props.title)}
        onDragOver={(event) => allowDrop(event)}
      >
        {props.tasks.map((task) => (
          <Task
            task={task}
            key={task.title}
            changeDraggedElement={props.changeDraggedElement}
          />
        ))}
      </div>
    </div>
  );
}
