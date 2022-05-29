import "./Register.css";
import React from "react";

import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password_repeat: "",
    first_name: "",
    last_name: "",
    password: "",
    passwordError: false,
    usernameError: false,
  };

  handleChange = (e) => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
    console.log(this.state);
  };
  handleSubmit = () => {
    // Register
    // Redirect to Board
  };

  render() {
    return (
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
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={this.handleSubmit}
          noValidate
          sx={{ mt: 1, marginLeft: 2, marginRight: 2 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="first_name"
            label="First Name"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => this.handleChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="last_name"
            label="Last Name"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => this.handleChange(e)}
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
            onChange={(e) => this.handleChange(e)}
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
            onChange={(e) => this.handleChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => this.handleChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password_repeat"
            label="Repeat Password"
            type="password"
            id="password_repeat"
            autoComplete="current-password"
            onChange={(e) => this.handleChange(e)}
          />
          {this.state.passwordError ? (
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
          {this.state.usernameError ? (
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
          <a className="link" href="">
            here{" "}
          </a>
          to login
        </Typography>
      </Box>
    );
  }
}

export default Register;
