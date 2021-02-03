import React, { useState, useEffect, useLayoutEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import {
  Main,
  Grid,
  EatOutHero,
  Reviews,
  ErrorHandler,
  EatOutPageInfo,
  Map,
  RestaurantSlider,
  Breadcrumbs,
} from "../../../components";
import "./SingleRestaurantPage.scss";

const SingleRestaurantPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [restaurantData, setRestaurantData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [similarRestaurantData, setSimilarData] = useState(null);

  const { url } = useRouteMatch();
  const restaurantName = url.split("/")[3];

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    document.title = `${restaurantName} | Team Space`;

    const fetchRestaurantData = async () => {
      const data = await fetch(
        `${process.env.REACT_APP_DATABASE_URL}/restaurantList?name=${restaurantName}`
      )
        .then((res) => res.json())
        .catch(() => {
          setIsError(true);
        });
      setRestaurantData(data[0]);
      getSimilarRestaurants(data);
      setIsLoading(false);
    };

    const fetchUserInfo = async () => {
      const data = await fetch(
        `${process.env.REACT_APP_DATABASE_URL}/userData`
      ).then((res) => res.json());
      setCurrentUser(`${data.firstName} ${data.lastName}`);
    };

    fetchRestaurantData();
    fetchUserInfo();
  }, [restaurantName]);

  const getSimilarRestaurants = (data) => {
    if (data) {
      const firstCategory = data[0].categories[0];
      const secCategory = data[0].categories[1];
      const thirdCategory = data[0].categories[2];

      fetch(
        `${process.env.REACT_APP_DATABASE_URL}/restaurantList?categories_like=${firstCategory}&&categories_like=${secCategory}&&categories_like=${thirdCategory}`
      )
        .then((res) => res.json())
        .then((res) => {
          const filteredArray = [...res];
          const index = filteredArray.findIndex((i) => i.name === data[0].name);
          if (index > -1) {
            filteredArray.splice(index, 1);
          }
          setSimilarData(filteredArray);
        });
    }
  };

  return (
    <Main page="single-restaurant">
      {!isLoading && !restaurantData && (
        <ErrorHandler
          buttonLink="/eat-out"
          buttonText="Go back to Eat-Out page"
        >
          We couln&apos;t find a restaurant with this name.
        </ErrorHandler>
      )}
      {isError && (
        <ErrorHandler
          buttonLink="/eat-out"
          buttonText="Go back to Eat-Out page"
        >
          It&apos;s seems something went wrong while trying to fetch restaurant
          data.
        </ErrorHandler>
      )}
      {!isLoading && restaurantData && (
        <div className="single-restaurant-page">
          <div className="single-restaurant-page__breadcrumbs">
            <Breadcrumbs onTop={true} />
          </div>
          <Grid columnCount={1}>
            <EatOutHero
              name={restaurantData.name}
              imageUrl={restaurantData.image}
              categories={restaurantData.categories}
              checkIns={restaurantData.checkIns}
              likes={restaurantData.likes}
              currentUser={currentUser}
              id={restaurantData.id}
              restaurantRating={restaurantData.rating.score.toFixed(1)}
            />
          </Grid>
          <div className="single-restaurant-page__wrapper">
            <div className="restaurant-info">
              <Grid columnCount={3}>
                <div className="information-container">
                  <h2 className="information-container__title">Information</h2>
                  <EatOutPageInfo id={restaurantData.id} />
                  <h2 className="information-container__title">Location</h2>
                  <Map address={restaurantData.address} />
                </div>
                <aside className="reviews-container">
                  <Reviews id={restaurantData.id} />
                </aside>
              </Grid>
              <Grid columnCount={1}>
                {similarRestaurantData && (
                  <RestaurantSlider
                    sliderRestaurantData={similarRestaurantData}
                    currentUser={currentUser}
                  >
                    Also you could like
                  </RestaurantSlider>
                )}
              </Grid>
            </div>
          </div>
        </div>
      )}
    </Main>
  );
};

export default SingleRestaurantPage;
