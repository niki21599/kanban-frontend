import "./App.css";

import Navbar from "./components/Navbar/Navbar";

import MainBoard from "./components/MainBoard/MainBoard";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import React, { useEffect } from "react";
import { getTasks } from "./api/apiCalls";
import { Route, Routes } from "react-router-dom";
import Impressum from "./components/Impressum/Impressum";
import Datenschutz from "./components/Datenschutz/Datenschutz";
import { setActiveBoard, useFetchBoardsQuery } from "./store";
import { useDispatch, useSelector } from "react-redux";
import NoBoards from "./components/NoBoards/NoBoards";

function App() {
  let [loggedIn, setLoggedIn] = React.useState(() => {
    const token = localStorage.getItem("token");
    return token !== null;
  });

  let dispatch = useDispatch();

  let { data, isFetching, error } = useFetchBoardsQuery();

  let handleLogin = (token) => {
    setLoggedIn(true);
    localStorage.setItem("token", token);
  };

  let handleLogout = () => {
    setLoggedIn(false);
    localStorage.clear();
    //setBoard({});
    //setBoardsAdded(false);
  };

  let mainContent;
  if (isFetching) {
    mainContent = <div> Loading</div>;
  } else if (error) {
    mainContent = <div>Error fetching Boards</div>;
  } else if (data.length > 0) {
    dispatch(setActiveBoard(data[0])); // hier Daten aus url lesen
    mainContent = <MainBoard loggedIn={loggedIn} />;
  } else {
    mainContent = (
      <div>
        <NoBoards />
      </div>
    );
  }

  return (
    <React.Fragment>
      <div>
        <Navbar loggedIn={loggedIn} logout={handleLogout} />
        <Routes>
          <Route
            path="/login"
            element={<Login login={handleLogin} loggedIn={loggedIn} />}
          ></Route>{" "}
          <Route
            path="/register"
            element={<Register login={handleLogin} loggedIn={loggedIn} />}
          ></Route>{" "}
          {<Route path="/" element={mainContent}></Route>}
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
