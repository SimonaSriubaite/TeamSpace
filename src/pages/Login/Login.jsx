import React from "react";
import "./Login.scss";
import { ReactComponent as Logo } from "../../assets/logoprimary.svg";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = () => {
  return (
    <div className="loginPage">
      <div className="loginPage__logoContainer">
        <Logo className="loginPage__logo" alt="Team Space logo" />
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
