import "./App.css";

import Navbar from "./components/Navbar/Navbar";

import MainBoard from "./components/MainBoard/MainBoard";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import React, { useEffect } from "react";
import { getTasks } from "./api/apiCalls";
import {
  BrowserRouter,
  Route,
  Routes,
  Switch,
  Link,
  Navigate,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Impressum from "./components/Impressum/Impressum";
import Datenschutz from "./components/Datenschutz/Datenschutz";

function App() {
  let categories = ["To do", "In progress", "Testing", "Done"];
  let sample = {};

  let isAutheticated = false;

  let [board, setBoard] = React.useState(() => {
    const board = localStorage.getItem("board");
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

  useEffect(() => {
    console.log("Der aktuelle LocalStorage: ", localStorage);
    isAutheticated = false;
  });

  let handleLoginAfterRefresh = () => {
    setLoggedIn(true);
  };

  let handleLogin = (token) => {
    setLoggedIn(true);
    console.log("needs to be saved: ", token);
    localStorage.setItem("token", token);
    console.log("the saved Storage: ", localStorage.getItem("token"));
  };

  let handleLogout = () => {
    setLoggedIn(false);
    localStorage.clear();
    console.log("delete Token");
    setBoardsAdded(true);
  };

  let handleChange = (board) => {
    setBoard(board);
    if (board !== {}) {
      setBoardsAdded(true);
    }

    localStorage.setItem("board", JSON.stringify(board));
    console.log(localStorage);

    getTasks(board.pk).then((result) => {
      setTasks(result);
    });
  };
  let handleChangeCat = (newTasks) => {
    setTasks(newTasks);
  };

  let addBoard = (newBoard) => {
    let oldBoards = [...boards];
    oldBoards.push(newBoard);
    setBoards(oldBoards);
  };

  // Why the hell does it not update
  let addTask = (newTask) => {
    let oldTasks = [...tasks];
    console.log("Before Add: ", oldTasks);
    oldTasks.push(newTask);
    setTasks(oldTasks);
    console.log("After Add: ", tasks);
  };

  // Nachschauen wie man state Array besser aktualisiert.

  let changeUrgency = (task_id, newUrgency) => {
    let remainingTasks = tasks.filter((task) => task_id !== task.pk);
    let [newTask] = tasks.filter((task) => task_id === task.pk);
    newTask.fields.urgency = newUrgency;
    remainingTasks.push(newTask);
    setTasks(remainingTasks);
  };

  let changeUser = (task_id, newUser) => {
    let remainingTasks = tasks.filter((task) => task_id !== task.pk);
    let [newTask] = tasks.filter((task) => task_id === task.pk);
    newTask.fields.user = newUser;
    remainingTasks.push(newTask);
    setTasks(remainingTasks);
  };
  let handleChangeCatWithOne = (task_id, newCategory) => {
    let remainingTasks = tasks.filter((task) => task_id !== task.pk);
    let [newTask] = tasks.filter((task) => task_id === task.pk);
    newTask.fields.category = newCategory;
    remainingTasks.push(newTask);
    setTasks(remainingTasks);
  };

  const deleteTask = (task_id) => {
    let oldTasks = [...tasks];
    oldTasks = oldTasks.filter((task) => task.pk !== task_id);
    setTasks(oldTasks);
  };

  const addUserToBoard = (user_ids) => {
    console.log(user_ids);
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
          login={handleLogin}
        />

        <Routes>
          <Route
            path="/login"
            element={<Login login={handleLogin} loggedIn={loggedIn} />}
          ></Route>
          <Route
            path="/register"
            element={<Register login={handleLogin} loggedIn={loggedIn} />}
          ></Route>
          <Route
            path="/"
            element={
              <MainBoard
                board={board}
                tasks={tasks}
                handleChangeCat={handleChangeCat}
                handleChangeCatWithOne={handleChangeCatWithOne}
                changeUrgency={changeUrgency}
                changeUser={changeUser}
                addBoard={addBoard}
                addTask={addTask}
                deleteTask={deleteTask}
                addUserToBoard={addUserToBoard}
                loggedIn={loggedIn}
                boardsAdded={boardsAdded}
                changeBoard={handleChange}
                loginAfterRefresh={handleLoginAfterRefresh}
              />
            }
          ></Route>
          <Route path="/impressum" element={<Impressum />}></Route>
          <Route path="/datenschutz" element={<Datenschutz />}></Route>
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
