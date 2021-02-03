import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Main, Button } from "../../components";
import { ReactComponent as Icon404 } from "../../assets/404-page.svg";
import "./Error.scss";

const Error = () => {
  useEffect(() => {
    document.title = "404 Page not found";
  }, []);

  return (
    <Main page="standard">
      <div className="error-message">
        <Icon404 className="error-message__image" />
        <h1>Oops!</h1>
        <h5 className="error-message__message">Error 404: Page Not Found</h5>
        <Link to="/" className="error-message__button">
          <Button type="medium" buttonClassNames="button--centered">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </Main>
  );
};

export default Error;
