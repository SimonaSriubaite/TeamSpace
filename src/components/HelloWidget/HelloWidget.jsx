import React, { useState, useEffect } from "react";
import "./HelloWidget.scss";

const HelloWidget = () => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState(null);
  const time = new Date().getHours();

  useEffect(() => {
    const timer = setInterval(() => {
      tick();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DATABASE_URL}/userData/`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((error) => {});
  }, []);

  const tick = () => {
    setDate(new Date());
  };

  const greeting = () => {
    if (time < 12) {
      return "Good morning, ";
    } else if (time < 17) {
      return "Good afternoon, ";
    } else {
      return "Good evening, ";
    }
  };

  if (!data) {
    return null;
  }

  return (
    <div className="hello-widget">
      <span className="hello-widget__clock">
        {date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </span>
      <span className="hello-widget__clock hello-widget__clock--text">
        {greeting() + data.firstName + "."}
      </span>
    </div>
  );
};

export default HelloWidget;
