import React, { useEffect } from "react";
import {
  Grid,
  Main,
  HelloWidget,
  WeatherWidget,
  NewsFeed,
  EatOutSection,
  ReservationSection,
} from "../../components";
import "./Dashboard.scss";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Team Space";
  }, []);

  return (
    <Main page="dashboard">
      <Grid columnCount={2}>
        <HelloWidget />
        <WeatherWidget />
      </Grid>
      <ReservationSection />
      <EatOutSection />
      <NewsFeed />
    </Main>
  );
};

export default Dashboard;
