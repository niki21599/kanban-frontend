import React from "react";
import "./BoardContainer.css";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Task from "../Task/Task";
import AddTask from "../AddTask/AddTask";
import { setCategoryAddTaskForm, setOpenAddTaskDialog } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedTask,
  setOpenTaskDetailDialog,
  useChangeCategoryMutation,
  useFetchTasksQuery,
} from "../../store";

export default function BoardContainer(props) {
  let dispatch = useDispatch();
  let { board } = useSelector((state) => state.activeBoard);
  let { currentDraggedElement } = useSelector((state) => state.draggedTask);
  let { token } = useSelector((state) => state.loggedIn);
  let [changeCategory, results] = useChangeCategoryMutation();

  let moveTo = async (category) => {
    let data = { task_id: currentDraggedElement, newCategory: category, token };
    await changeCategory(data);
  };
  let allowDrop = (event) => {
    event.preventDefault();
  };

  let taskData = useFetchTasksQuery({
    board_id: board.pk,
    token,
  });

  let getTasksOfCategory = (cat) => {
    if (taskData.isFetching || taskData.error) {
      return [];
    } else {
      let tasks = taskData.data.filter((task) => task.fields.category == cat);
      return tasks;
    }
  };

  const handleAddTask = () => {
    dispatch(setOpenAddTaskDialog(true));
    dispatch(setCategoryAddTaskForm(props.title));
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
        {getTasksOfCategory(props.title).map((task) => (
          <Task task={task} key={task.pk} />
        ))}{" "}
      </div>{" "}
      <AddTask category={props.title}></AddTask>{" "}
    </div>
  );
}
