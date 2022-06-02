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
    this.setState({ passwordError: false, usernameError: false });
    console.log(this.state);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // Register
    register(
      this.state.username,
      this.state.password,
      this.state.password_repeat,
      this.state.email,
      this.state.first_name,
      this.state.last_name
    ).then((result) => {
      console.log(result);
      if (result.token) {
        this.props.login(result.token);
      } else if (result.errorMessage == "Username already exists") {
        this.setState({
          usernameError: true,
          password: "",
          password_repeat: "",
        });
      } else if (result.errorMessage == "Passwords don't match") {
        this.setState({
          passwordError: true,
          password: "",
          password_repeat: "",
        });
      }
    });
  };

  render() {
    return (
      <div>
        {this.props.loggedIn ? (
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
              onSubmit={(e) => this.handleSubmit(e)}
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
                value={this.state.first_name}
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
                value={this.state.last_name}
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
                value={this.state.username}
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
                value={this.state.email}
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
                value={this.state.password}
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
                value={this.state.password_repeat}
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
}

export default Register;
