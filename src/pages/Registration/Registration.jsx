import RegistrationForm from "components/RegistrationForm/RegistrationForm";
import React from "react";
import "./Registration.scss";
import { ReactComponent as Logo } from "../../assets/logoprimary.svg";

const Registration = () => {
  return (
    <div className="registrationPage">
      <div className="registrationPage__logoContainer">
        <Logo className="registrationPage__logo" alt="Team Space logo" />
      </div>
      <RegistrationForm />
    </div>
  );
};

export default Registration;
