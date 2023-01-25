import "./App.css";

import Navbar from "./components/Navbar/Navbar";

import MainBoard from "./components/MainBoard/MainBoard";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import React from "react";
import { getTasks } from "./api/apiCalls";
import { Route, Routes } from "react-router-dom";
import Impressum from "./components/Impressum/Impressum";
import Datenschutz from "./components/Datenschutz/Datenschutz";

function App() {
  let [board, setBoard] = React.useState(() => {
    let board = localStorage.getItem("board");

    if (board) {
      return JSON.parse(board);
    } else {
      return {};
    }
  });
  let [boards, setBoards] = React.useState([]);
  let [tasks, setTasks] = React.useState([]);
  let [loggedIn, setLoggedIn] = React.useState(() => {
    const token = localStorage.getItem("token");
    return token !== null;
  });
  let [boardsAdded, setBoardsAdded] = React.useState(false);

  let handleLoginAfterRefresh = () => {
    setLoggedIn(true);
  };

  let handleLogin = (token) => {
    setLoggedIn(true);
    localStorage.setItem("token", token);
  };

  let handleLogout = () => {
    setLoggedIn(false);
    localStorage.clear();
    setBoard({});
    setBoardsAdded(false);
  };

  let handleChange = (board) => {
    setBoard(board);

    if (board !== {}) {
      setBoardsAdded(true);
      localStorage.setItem("board", JSON.stringify(board));
      getTasks(board.pk).then((result) => {
        setTasks(result);
      });
    }
  };
  let handleChangeCat = (newTasks) => {
    setTasks(newTasks);
  };

  let handleAddBoard = (newBoard) => {
    let oldBoards = [...boards];
    oldBoards.push(newBoard);
    setBoards(oldBoards);
  };

  let handleAddTask = (newTask) => {
    let oldTasks = [...tasks];
    oldTasks.push(newTask);
    setTasks(oldTasks);
  };

  let handleChangeUrgency = (task_id, newUrgency) => {
    let remainingTasks = [...tasks];
    let index = tasks.findIndex((task) => task.pk == task_id);
    let changingTask = { ...remainingTasks[index] };
    changingTask.fields.urgency = newUrgency;
    remainingTasks[index] = changingTask;
    setTasks(remainingTasks);
  };

  let handleChangeUser = (task_id, newUser) => {
    let remainingTasks = [...tasks];
    let index = tasks.findIndex((task) => task.pk == task_id);
    let changingTask = { ...remainingTasks[index] };
    changingTask.fields.user = newUser;
    remainingTasks[index] = changingTask;
    setTasks(remainingTasks);
  };

  let handleChangeCatWithOneTask = (task_id, newCategory) => {
    let remainingTasks = [...tasks];
    let index = tasks.findIndex((task) => task.pk == task_id);
    let changingTask = { ...remainingTasks[index] };
    changingTask.fields.category = newCategory;
    remainingTasks[index] = changingTask;
    setTasks(remainingTasks);
  };

  const handleDeleteTask = (task_id) => {
    let oldTasks = [...tasks];
    oldTasks = oldTasks.filter((task) => task.pk !== task_id);
    setTasks(oldTasks);
  };

  const handleAddUserToBoard = (user_ids) => {
    let oldBoard = { ...board };
    user_ids.forEach((user_id) => {
      oldBoard.fields.users.push(user_id);
    });
    setBoard(oldBoard);
  };

  return (
    <React.Fragment>
      <div>
        <Navbar
          handleChange={handleChange}
          boards={boards}
          setBoards={setBoards}
          loggedIn={loggedIn}
          logout={handleLogout}
          setBoard={setBoard}
        />
        <Routes>
          <Route
            path="/login"
            element={<Login login={handleLogin} loggedIn={loggedIn} />}
          ></Route>{" "}
          <Route
            path="/register"
            element={<Register login={handleLogin} loggedIn={loggedIn} />}
          ></Route>{" "}
          <Route
            path="/"
            element={
              <MainBoard
                board={board}
                tasks={tasks}
                handleChangeCat={handleChangeCat}
                handleChangeCatWithOne={handleChangeCatWithOneTask}
                changeUrgency={handleChangeUrgency}
                changeUser={handleChangeUser}
                addBoard={handleAddBoard}
                addTask={handleAddTask}
                deleteTask={handleDeleteTask}
                addUserToBoard={handleAddUserToBoard}
                loggedIn={loggedIn}
                boardsAdded={boardsAdded}
                changeBoard={handleChange}
                loginAfterRefresh={handleLoginAfterRefresh}
              />
            }
          ></Route>{" "}
          <Route path="/impressum" element={<Impressum />}>
            {" "}
          </Route>{" "}
          <Route path="/datenschutz" element={<Datenschutz />}>
            {" "}
          </Route>{" "}
        </Routes>{" "}
      </div>{" "}
    </React.Fragment>
  );
}

export default App;
