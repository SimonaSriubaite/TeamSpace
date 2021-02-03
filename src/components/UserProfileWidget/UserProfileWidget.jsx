import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./UserProfileWidget.scss";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import { ReactComponent as Settings } from "assets/settings.svg";
import { ReactComponent as LogOut } from "assets/login.svg";
import { ReactComponent as Arrow } from "assets/arrow.svg";
import { useOutsideAlerter } from "./OutsideAlerter";
import classNames from "classnames";

const UserProfileWidget = () => {
  const history = useHistory();
  const { open, setOpen, ref } = useOutsideAlerter(false);
  const [data, setData] = useState(null);
  const options = [
    {
      icon: <Settings />,
      name: "Settings",
      action: () => {},
    },
    {
      icon: <LogOut />,
      name: "Log out",
      action: () => {
        fetch(`${process.env.REACT_APP_DATABASE_URL}/loggedInUser`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({}),
        }).then((response) => response.json());
        history.push("/login", { from: "/" });
      },
    },
  ];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DATABASE_URL}/userData`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((error) => {});
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={classNames("user-profile-widget", { "is-open": open })}
    >
      <button
        className="user-profile-widget__button"
        onClick={() => setOpen(!open)}
        style={{ backgroundImage: `url(${data.userImage})` }}
      >
        <div className="user-profile-widget__arrow">
          <Arrow />
        </div>
      </button>
      {open && (
        <div>
          <DropdownMenu options={options} />
        </div>
      )}
    </div>
  );
};

export default UserProfileWidget;
