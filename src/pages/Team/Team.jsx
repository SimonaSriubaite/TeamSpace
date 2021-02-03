import React, { useEffect } from "react";
import { ReactComponent as RocketSvg } from "../../assets/status-202-rocket.svg";
import { ReactComponent as Person1 } from "../../assets/status-202-person-1.svg";
import { ReactComponent as Person2 } from "../../assets/status-202-person-2.svg";
import { ReactComponent as Person3 } from "../../assets/status-202-person-3.svg";
import { ReactComponent as Person4 } from "../../assets/status-202-person-4.svg";
import { ReactComponent as Person5 } from "../../assets/status-202-person-5.svg";
import "./Team.scss";

const Team = () => {
  useEffect(() => {
    document.title = "Nice to meet you! | Team Space";
  }, []);

  return (
    <main className="team-page">
      <header className="team-page__header">
        <h1 className="team-page__title">Status-202</h1>
        <p className="team-page__description thin">
          * response status code indicates that the request has been accepted
          for processing, but the processing has not been completed;
        </p>
      </header>
      <RocketSvg className="team-page__rocket" />
      <Person1 className="team-page__person team-page__person--1 floating-1" />
      <Person2 className="team-page__person team-page__person--2 floating-2" />
      <Person3 className="team-page__person team-page__person--3" />
      <Person4 className="team-page__person team-page__person--4 floating-2" />
      <Person5 className="team-page__person team-page__person--5 floating-1" />
    </main>
  );
};

export default Team;
