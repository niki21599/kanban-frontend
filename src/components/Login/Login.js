import React from "react";
import "./Login.css";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { login, register, addGuestBoards } from "../../api/apiCalls";
import { Navigate } from "react-router-dom";
import ImpressumFooter from "../ImpressumFooter/ImpressumFooter";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setPassword, setUsername, setWrongData } from "../../store";

function Login(props) {
  let { username, password, wrongData } = useSelector(
    (state) => state.loginForm
  );

  let dispatch = useDispatch();

  let handleChange = (e) => {
    dispatch(setWrongData(false));

    if (e.currentTarget.id == "username") {
      dispatch(setUsername(e.currentTarget.value));
    }

    if (e.currentTarget.id == "password") {
      dispatch(setPassword(e.currentTarget.value));
    }
  };
  let handleSubmit = (e) => {
    e.preventDefault();

    login(username, password).then((result) => {
      if (result.token) {
        props.login(result.token);
      } else {
        dispatch(setUsername(""));
        dispatch(setPassword(""));
        dispatch(setWrongData(true));
      }
    });
  };

  let guestLogin = () => {
    let number = getRandomNumber();
    let username = "Mustermann" + number.toString();
    let firstName = getFirstname();
    let lastName = getLastname();
    register(username, "123456", "123456", "x@gmail.com", firstName, lastName)
      .then((result) => {
        if (result.token) {
          props.login(result.token);
        }
      })
      .then(() => {
        console.log("Add Guest Boards");
        addGuestBoards();
      });
  };

  let getRandomNumber = () => {
    let min = 1;
    let max = 1000000;
    return Math.round(Math.random() * (max - min)) + min;
  };

  let getFirstname = () => {
    let random = Math.round(Math.random() * (7 - 0)) + 0;
    let names = [
      "Luca",
      "Philipp",
      "Niklas",
      "Julian",
      "Tim",
      "Justus",
      "Nico",
      "Matthias",
      "Fabian",
    ];
    return names[random];
  };

  let getLastname = () => {
    let random = Math.round(Math.random() * (7 - 0)) + 0;
    let names = [
      "Groß",
      "Wallrich",
      "Burg",
      "Thielen",
      "Klein",
      "Loch",
      "Jakob",
      "Schmitt",
      "Dany",
    ];
    return names[random];
  };

  return (
    <div>
      {!props.loggedIn ? (
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid lightgray",
            width: 350,
            boxShadow: "2px -1px 5px rgba(0,0,0,0.2)",
            marginLeft: "calc(50vw - 176px)",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ marginTop: 1 }}>
            Sign in
          </Typography>{" "}
          <Box
            component="form"
            onSubmit={(e) => handleSubmit(e)}
            noValidate
            sx={{ mt: 1, marginLeft: 2, marginRight: 2 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => handleChange(e)}
            />{" "}
            <TextField
              margin="normal"
              required
              fullWidth
              role="textbox"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => handleChange(e)}
            />{" "}
            {wrongData ? (
              <Typography
                variant="string"
                align="center"
                sx={{ marginTop: 1, color: "red" }}
              >
                Username or Password wrong{" "}
              </Typography>
            ) : (
              ""
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In{" "}
            </Button>{" "}
          </Box>{" "}
          <Typography variant="string" sx={{ marginTop: 1, marginBottom: 1 }}>
            Click{" "}
            <Link className="link" to="/register">
              {"here "}
            </Link>
            to create a new Account.{" "}
          </Typography>{" "}
          <Button onClick={() => guestLogin()}>Continue as Guest</Button>
        </Box>
      ) : (
        <Navigate to="/" />
      )}
      <ImpressumFooter position="" />
    </div>
  );
}

export default Login;
