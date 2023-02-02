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
import {
  setPasswordLoginForm,
  setUsernameLoginForm,
  setWrongDataLoginForm,
  useAddGuestBoardsMutation,
  useLoginMutation,
  useRegisterMutation,
} from "../../store";

function Login(props) {
  let { username, password, wrongData } = useSelector(
    (state) => state.loginForm
  );

  let { token } = useSelector((state) => state.loggedIn);

  let [login] = useLoginMutation();
  let [register] = useRegisterMutation();
  let [addGuestBoards] = useAddGuestBoardsMutation();

  let { loggedIn } = useSelector((state) => state.loggedIn);

  let dispatch = useDispatch();

  let handleChange = (e) => {
    dispatch(setWrongDataLoginForm(false));

    if (e.currentTarget.id == "username") {
      dispatch(setUsernameLoginForm(e.currentTarget.value));
    }

    if (e.currentTarget.id == "password") {
      dispatch(setPasswordLoginForm(e.currentTarget.value));
    }
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    let userData = { username, password };

    login(userData).then((result) => {
      if (result.data.token) {
        props.login(result.data.token);
      } else {
        dispatch(setUsernameLoginForm(""));
        dispatch(setPasswordLoginForm(""));
        dispatch(setWrongDataLoginForm(true));
      }
    });
  };

  let guestLogin = () => {
    let number = getRandomNumber();
    let username = "Mustermann" + number.toString();
    let firstName = getFirstname();
    let lastName = getLastname();
    register({
      username,
      firstName,
      lastName,
      password: "123456",
      passwordRepeat: "123456",
      email: "x@gmail.com",
    }).then((result) => {
      if (result.data.token) {
        addGuestBoards("Token " + result.data.token).then(() =>
          props.login(result.data.token)
        );
      }
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
      {!loggedIn ? (
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
