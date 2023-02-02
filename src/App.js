import "./App.css";

import Navbar from "./components/Navbar/Navbar";

import MainBoard from "./components/MainBoard/MainBoard";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import React, { useEffect } from "react";
import { getTasks } from "./api/apiCalls";
import { Navigate, Route, Routes } from "react-router-dom";
import Impressum from "./components/Impressum/Impressum";
import Datenschutz from "./components/Datenschutz/Datenschutz";
import { setActiveBoard, useFetchBoardsQuery } from "./store";
import { useDispatch, useSelector } from "react-redux";
import NoBoards from "./components/NoBoards/NoBoards";
import { login, logout } from "./store";

function App() {
  let dispatch = useDispatch();
  let { token, loggedIn } = useSelector((state) => state.loggedIn);

  let handleLogin = (token) => {
    dispatch(login(token));
    localStorage.setItem("tokenKanban", token);
  };

  return (
    <React.Fragment>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login login={handleLogin} />}></Route>{" "}
          <Route
            path="/register"
            element={<Register login={handleLogin} />}
          ></Route>{" "}
          {
            <Route
              path="/:boardId"
              element={loggedIn ? <MainBoard /> : <Navigate to={"/login"} />}
            ></Route>
          }
          {
            <Route
              path="/"
              element={
                loggedIn ? <Navigate to="/-1" /> : <Navigate to={"/login"} />
              }
            ></Route>
          }
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
