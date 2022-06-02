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
      className={"taskCard " + props.task.fields.color}
      draggable="true"
      onDragStart={() => startDragging(props.task.pk)}
      onClick={() => props.openDetail(props.task.pk)}
    >
      <Typography variant="h6"> {props.task.fields.title} </Typography>{" "}
    </Card>
  );
}
