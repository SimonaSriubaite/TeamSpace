import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./LoginForm.scss";

const LoginForm = () => {
  const history = useHistory();

  const emptyArrayObject = [
    {
      fname: "",
      lname: "",
      email: "",
      pass: "",
      rpass: "",
      id: "",
    },
  ];

  const emptyObject = {
    email: "",
    pass: "",
  };

  const InputNamesArray = ["Email", "Password"];

  const [loginState, setLoginState] = useState(emptyArrayObject);
  const [userInput, setUserInput] = useState(emptyObject);
  const [errors, setErrors] = useState({});
  const [matchedUser, setMatchedUser] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const resetForm = () => {
    setUserInput(emptyObject);
  };

  const fetchData = async () => {
    await fetch(`${process.env.REACT_APP_DATABASE_URL}/userList`)
      .then((res) => res.json())
      .then((res) => {
        setLoginState(res);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const inputChangeHandler = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (loginState !== emptyArrayObject) {
      let userMatch = loginState.find(
        (user) => user.email === userInput.email && user.pass === userInput.pass
      );
      let userIncorrectPassword = loginState.find(
        (user) => user.email === userInput.email && user.pass !== userInput.pass
      );

      if (userMatch !== undefined) {
        setIsFormValid(true);
        setMatchedUser(userMatch);
      } else if (
        userMatch === undefined &&
        userIncorrectPassword === undefined
      ) {
        errors.email = "User does not exist";
        setIsFormValid(false);
      }
      if (userIncorrectPassword !== undefined) {
        setIsFormValid(false);
        errors.pass = "Password incorrect";
      }
    }
    setErrors(errors);
  };
  //gathers data from db of all registrated users
  const formSubmitHandler = (e) => {
    e.preventDefault();
    fetchData();
  };
  //posts the logged in users details to database
  const postLoginDetails = () => {
    if (isFormValid) {
      fetch(`${process.env.REACT_APP_DATABASE_URL}/loggedInUser`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(matchedUser),
      }).then((response) => response.json());
      resetForm();
      history.push("/", { from: "/login" });
    }
  };

  //Fires whenever the Login button is clicked
  useEffect(() => {
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginState]);

  //Fires whenever the form is valid or not
  useEffect(() => {
    postLoginDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormValid]);

  return (
    <form className="loginForm" onSubmit={formSubmitHandler}>
      <div className="loginForm__titleContainer">
        <h2 className="loginForm__title h2-alt">Login</h2>
        <p className="loginForm__paragraph body">Welcome back, please login.</p>
      </div>
      {Object.keys(userInput).map((item, index) => (
        <div key={item} className="loginForm__fieldContainer">
          <label
            key={index}
            htmlFor={item}
            className="loginForm__labelSmall caption"
          >
            {InputNamesArray[index]}
          </label>
          <input
            id={item}
            name={item}
            type={item === "pass" ? "password" : "text"}
            className={
              !errors[item]
                ? "loginForm__inputFieldBig body"
                : "loginForm__inputFieldBig loginForm__inputFieldBig--error body"
            }
            value={userInput[item]}
            placeholder="Enter details.."
            onChange={inputChangeHandler}
          />
          {errors[item] && <i className="clear"></i>}
          {errors[item] && (
            <span className="loginForm__errorMessage">{errors[item]}</span>
          )}
        </div>
      ))}
      <div className="loginForm__submitContainer">
        <button className="loginForm__submitButton" type="submit">
          LOGIN
        </button>
        <p className="loginForm__paragraph loginForm__paragraph--lastItem body">
          {"Don't have an account? "}
          <NavLink exact={true} to="/registration">
            Sign Up
          </NavLink>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
