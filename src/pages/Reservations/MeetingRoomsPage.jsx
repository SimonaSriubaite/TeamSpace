import React, { useEffect } from "react";
import { Main, Breadcrumbs, ReservationNav } from "../../components";
import { ReactComponent as Icon404 } from "../../assets/404-page.svg";
import "./MeetingRoomsPage.scss";

const MeetingRoomsPage = () => {
  useEffect(() => {
    document.title = `Meeting room reservations | Team Space`;
  }, []);

  return (
    <Main page="standard">
      <Breadcrumbs />
      <ReservationNav isActive="meeting rooms" />
      <h1>Meeting Room Reservations</h1>
      <figure className="no-content">
        <Icon404 className="no-content__image" />
      </figure>
    </Main>
  );
};

export default MeetingRoomsPage;
