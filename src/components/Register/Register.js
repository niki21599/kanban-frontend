import "./Register.css";
import React from "react";

import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { register } from "../../api/apiCalls";
import { Navigate } from "react-router-dom";
import ImpressumFooter from "../ImpressumFooter/ImpressumFooter";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmailRegisterForm,
  setFirstNameRegisterForm,
  setLastNameRegisterForm,
  setPasswordErrorRegisterForm,
  setPasswordRegisterForm,
  setPasswordRepeatRegisterForm,
  setUsernameErrorRegisterForm,
  setUsernameRegisterForm,
  useRegisterMutation,
  login,
} from "../../store";

function Register(props) {
  let {
    username,
    email,
    password,
    passwordRepeat,
    passwordError,
    usernameError,
    lastName,
    firstName,
  } = useSelector((state) => state.registerForm);

  let { loggedIn } = useSelector((state) => state.loggedIn);

  let [register, result] = useRegisterMutation();

  let dispatch = useDispatch();

  let handleChange = (e) => {
    switch (e.currentTarget.id) {
      case "username":
        dispatch(setUsernameRegisterForm(e.currentTarget.value));
        break;
      case "email":
        dispatch(setEmailRegisterForm(e.currentTarget.value));
        break;
      case "password":
        dispatch(setPasswordRegisterForm(e.currentTarget.value));
        break;
      case "passwordRepeat":
        dispatch(setPasswordRepeatRegisterForm(e.currentTarget.value));
        break;
      case "firstName":
        dispatch(setFirstNameRegisterForm(e.currentTarget.value));
        break;
      case "lastName":
        dispatch(setLastNameRegisterForm(e.currentTarget.value));
        break;

      default:
        break;
    }

    dispatch(setPasswordErrorRegisterForm(false));
    dispatch(setUsernameErrorRegisterForm(false));
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    // Register

    let result = await register({
      username,
      password,
      passwordRepeat,
      email,
      firstName,
      lastName,
    });
    console.log("The Answer", result);
    if (result.data.token) {
      dispatch(login(result.data.token));
      localStorage.setItem("tokenKanban", result.data.token);
    } else if (result.data.errorMessage == "Username already exists") {
      dispatch(setUsernameErrorRegisterForm(true));
      dispatch(setPasswordRegisterForm(""));
      dispatch(setPasswordRepeatRegisterForm(""));
    } else if (result.data.errorMessage == "Passwords don't match") {
      dispatch(setPasswordRegisterForm(""));
      dispatch(setPasswordRepeatRegisterForm(""));
      dispatch(setPasswordErrorRegisterForm(true));
    }

    // register(
    //   username,
    //   password,
    //   passwordRepeat,
    //   email,
    //   firstName,
    //   lastName
    // ).then((result) => {
    //   if (result.token) {
    //     props.login(result.token);
    //   } else if (result.errorMessage == "Username already exists") {
    //     dispatch(setUsernameErrorRegisterForm(true));
    //     dispatch(setPasswordRegisterForm(""));
    //     dispatch(setPasswordRepeatRegisterForm(""));
    //   } else if (result.errorMessage == "Passwords don't match") {
    //     dispatch(setPasswordRegisterForm(""));
    //     dispatch(setPasswordRepeatRegisterForm(""));
    //     dispatch(setPasswordErrorRegisterForm(true));
    //   }
    // });
  };

  return (
    <div>
      {loggedIn ? (
        <Navigate to="/" />
      ) : (
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
            marginBottom: 4,
          }}
        >
          <Typography component="h1" variant="h5" sx={{ marginTop: 1 }}>
            Sign Up
          </Typography>
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
              id="firstName"
              label="First Name"
              name="username"
              autoComplete="username"
              autoFocus
              value={firstName}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="username"
              autoComplete="username"
              autoFocus
              value={lastName}
              onChange={(e) => handleChange(e)}
            />
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="username"
              autoFocus
              value={email}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordRepeat"
              label="Repeat Password"
              type="password"
              id="passwordRepeat"
              value={passwordRepeat}
              autoComplete="current-password"
              onChange={(e) => handleChange(e)}
            />
            {passwordError ? (
              <Typography
                variant="string"
                align="center"
                sx={{ marginTop: 1, color: "red" }}
              >
                Passwords don't match
              </Typography>
            ) : (
              ""
            )}
            {usernameError ? (
              <Typography
                variant="string"
                align="center"
                sx={{ marginTop: 1, color: "red" }}
              >
                Username already exists
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
              Sign Up
            </Button>
          </Box>
          <Typography variant="string" sx={{ marginTop: 1, marginBottom: 1 }}>
            Click{" "}
            <Link to="/login" className="link">
              {"here "}
            </Link>
            to login.
          </Typography>
        </Box>
      )}
      <ImpressumFooter position="register"></ImpressumFooter>
    </div>
  );
}

export default Register;
