import React from "react";
import "./Login.css";

import { Navigate } from "react-router-dom";
import ImpressumFooter from "../ImpressumFooter/ImpressumFooter";
import { useSelector } from "react-redux";

import LoginBox from "../LoginBox/LoginBox";

function Login(props) {
  let { loggedIn } = useSelector((state) => state.loggedIn);

  return (
    <div>
      {!loggedIn ? <LoginBox login={props.login} /> : <Navigate to="/" />}
      <ImpressumFooter position="" />
    </div>
  );
}

export default Login;
