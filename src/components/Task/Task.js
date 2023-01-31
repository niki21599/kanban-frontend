import React from "react";
import "./Task.css";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  setCurrentDraggedElement,
  setSelectedTask,
  setOpenTaskDetailDialog,
} from "../../store";

export default function Task(props) {
  let dispatch = useDispatch();

  let startDragging = () => {
    dispatch(setCurrentDraggedElement(props.task.pk));
  };

  let openTaskDetail = () => {
    dispatch(setSelectedTask(props.task));
    dispatch(setOpenTaskDetailDialog(true));
  };

  return (
    <Card
      className={"taskCard " + props.task.fields.color}
      draggable="true"
      onDragStart={startDragging}
      onClick={openTaskDetail}
    >
      <Typography variant="h6"> {props.task.fields.title} </Typography>{" "}
    </Card>
  );
}
