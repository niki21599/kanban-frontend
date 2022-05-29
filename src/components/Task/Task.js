import React from "react";
import "./Task.css";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";

export default function Task(props) {
  let startDragging = (id) => {
    props.changeDraggedElement(id);
  };
  return (
    <Card
      className="taskCard"
      draggable="true"
      onDragStart={() => startDragging(props.task.id)}
      onClick={() => props.openDetail(props.task.id)}
    >
      <Typography variant="h6"> {props.task.title} </Typography>{" "}
    </Card>
  );
}
