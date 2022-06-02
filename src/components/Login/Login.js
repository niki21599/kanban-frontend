import React from "react";
import "./Login.css";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { login } from "../../api/apiCalls";
import { Navigate } from "react-router-dom";
import ImpressumFooter from "../ImpressumFooter/ImpressumFooter";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    wrongData: false,
  };

  handleChange = (e) => {
    this.setState({ wrongData: false });
    this.setState({
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    login(this.state.username, this.state.password).then((result) => {
      if (result.token) {
        this.props.login(result.token);
      } else {
        this.setState({ username: "", password: "", wrongData: true });
      }
    });
  };

  render() {
    return (
      <div>
        {!this.props.loggedIn ? (
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
              onSubmit={(e) => this.handleSubmit(e)}
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
                value={this.state.username}
                onChange={(e) => this.handleChange(e)}
              />{" "}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={(e) => this.handleChange(e)}
              />{" "}
              {this.state.wrongData ? (
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
          </Box>
        ) : (
          <Navigate to="/" />
        )}
        <ImpressumFooter position="" />
      </div>
    );
  }
}
export default Login;
