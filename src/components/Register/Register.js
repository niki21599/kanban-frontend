import "./Register.css";
import React from "react";
import { Navigate } from "react-router-dom";
import ImpressumFooter from "../ImpressumFooter/ImpressumFooter";
import { useSelector } from "react-redux";

import RegisterBox from "../RegisterBox/RegisterBox";

function Register() {
  let { loggedIn } = useSelector((state) => state.loggedIn);
  return (
    <div>
      {loggedIn ? <Navigate to="/" /> : <RegisterBox />}
      <ImpressumFooter position="register"></ImpressumFooter>
    </div>
  );
}

export default Register;
