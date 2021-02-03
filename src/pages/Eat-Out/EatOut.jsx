import React, { useState, useEffect } from "react";
import {
  Breadcrumbs,
  Main,
  Slider,
  EatOutCategoriesSection,
  NearYouSection,
  NewPlacesSection,
} from "../../components";
import "./EatOut.scss";

function EatOut() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    document.title = "Eat-out | Team Space";
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      await fetch(`${process.env.REACT_APP_DATABASE_URL}/userData`)
        .then((res) => res.json())
        .then((res) => {
          setCurrentUser(`${res.firstName} ${res.lastName}`);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    };
    fetchUserInfo();
  }, []);

  return (
    <Main page="standard">
      <div className="eat-out">
        <Breadcrumbs />
        <h1 className="eat-out__title">Hungry? Find the best place</h1>
        <section className="eat-out__section eat-out__section--slider">
          <Slider />
        </section>
        <section className="eat-out__section">
          <EatOutCategoriesSection />
        </section>
        <section className="eat-out__section eat-out__section--near-you">
          <NearYouSection currentUser={currentUser} />
        </section>
        <section className="eat-out__section eat-out__section--new-places">
          <NewPlacesSection currentUser={currentUser} />
        </section>
      </div>
    </Main>
  );
}

export default EatOut;
