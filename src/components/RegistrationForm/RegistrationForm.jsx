//TO DO
//The icon tag <i> requires a click function.

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import RegistrationModal from "components/RegistrationModal/RegistrationModal";
import "./RegistrationForm.scss";

const RegistrationForm = () => {
  //Empty object used for resetting registrationState
  const emptyObject = {
    fname: "",
    lname: "",
    email: "",
    pass: "",
    rpass: "",
  };
  const InputNamesArray = [
    "First Name",
    "Last Name",
    "Email",
    "Password",
    "Repeat Password",
  ];

  const [registrationState, setRegistrationState] = useState(emptyObject);
  const [errors, setErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const resetForm = () => {
    setRegistrationState(emptyObject);
  };

  const inputChangeHandler = (e) => {
    setRegistrationState({
      ...registrationState,
      [e.target.name]: e.target.value,
    });
  };
  //Validates the input data to match basic validation
  const validate = () => {
    let failed = "";
    if (!registrationState.fname || registrationState.fname.length < 2) {
      failed = { ...failed, fname: "Firstname is too short" };
    }
    if (!registrationState.lname || registrationState.lname.length < 2) {
      failed = { ...failed, lname: "Lastname is too short" };
    }
    //REGEX for email checks for any text before @ sign, text after it, a dot and then any domain
    let emailTest = /\S+@\S+\.\S+/;
    if (!registrationState.email || !emailTest.test(registrationState.email)) {
      failed = { ...failed, email: "Invalid email address" };
    }
    if (registrationState.pass !== registrationState.rpass) {
      failed = {
        ...failed,
        pass: "Password does not match",
        rpass: "Password does not match",
      };
    }
    setErrors(failed);
    if (failed === "") {
      return true;
    }
  };

  // Posts registrationState to database if Validate() function comes up true
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch(`${process.env.REACT_APP_DATABASE_URL}/userList`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(registrationState),
      }).then((response) => response.json());
      resetForm();
      setRegistrationSuccess(true);
    }
  };

  return (
    <form className="registrationForm" onSubmit={formSubmitHandler}>
      {registrationSuccess && (
        <RegistrationModal
          restaurantName={"name"}
          restaurantId={"id"}
          currentUser={{ hey: "hey" }}
          showModal={registrationSuccess}
          setShowModal={setRegistrationSuccess}
        />
      )}
      <div className="registrationForm__titleContainer">
        <h2 className="registrationForm__title h2-alt">Register</h2>
        <p className="registrationForm__paragraph body">
          {"Let's get you on board."}
        </p>
      </div>
      {/* ------------------------------Input fields------------------------------ */}
      {Object.keys(registrationState).map((item, index) => (
        <div key={item} className="registrationForm__fieldContainer">
          <label
            key={index}
            htmlFor={item}
            className="registrationForm__labelSmall caption"
          >
            {InputNamesArray[index]}
          </label>
          <input
            id={item}
            name={item}
            type={item === "pass" || item === "rpass" ? "password" : "text"}
            className={
              item !== "email" && !errors[item]
                ? "registrationForm__inputFieldSmall body"
                : item === "email" && !errors[item]
                ? "registrationForm__inputFieldBig body"
                : item !== "email" && errors[item]
                ? "registrationForm__inputFieldSmall registrationForm__inputFieldSmall--error body"
                : "registrationForm__inputFieldBig registrationForm__inputFieldBig--error body"
            }
            value={registrationState[item]}
            placeholder="Enter details.."
            onChange={inputChangeHandler}
          />
          {errors[item] && <i className="clear"></i>}

          {errors[item] && (
            <span className="registrationForm__errorMessage">
              {errors[item]}
            </span>
          )}
        </div>
      ))}
      {/* ------------------------------SUBMIT Container------------------------------ */}
      <div className="registrationForm__submitContainer">
        <button className="registrationForm__submitButton" type="submit">
          REGISTER
        </button>
        <p className="registrationForm__paragraph registrationForm__paragraph--lastItem body">
          Already have an account?{" "}
          <NavLink exact={true} to="/login">
            Sign In
          </NavLink>
        </p>
      </div>
    </form>
  );
};

export default RegistrationForm;
