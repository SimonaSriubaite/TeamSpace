import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Breadcrumbs,
  Main,
  RestaurantCard,
  Grid,
  ErrorHandler,
} from "../../../components/";
import { filterByCategory } from "../../../utils/filterByCategory";
import { capitalizeString } from "../../../utils/capitalizeString";
import "./CategoryPage.scss";

const CategoryPage = ({ match }) => {
  const {
    params: { categoryName },
  } = match;

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [filteredList, setFilteredList] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    document.title = `${capitalizeString(categoryName)} | Team Space`;

    const fetchUserInfo = async () => {
      await fetch(`${process.env.REACT_APP_DATABASE_URL}/userData`)
        .then((res) => res.json())
        .then((res) => {
          setCurrentUser(`${res.firstName} ${res.lastName}`);
        })
        .catch(() => {
          setIsError(true);
        });
    };
    const fetchRestaurantInfo = async () => {
      await fetch(
        `${process.env.REACT_APP_DATABASE_URL}/restaurantList?_sort=rating.score&_order=desc`
      )
        .then((res) => res.json())
        .then((res) => {
          setFilteredList(filterByCategory(res, categoryName));
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsError(true);
        });
    };
    fetchRestaurantInfo();
    fetchUserInfo();
  }, [categoryName]);

  return (
    <Main page="standard">
      {!isLoading && !filteredList.length && (
        <ErrorHandler
          buttonLink="/eat-out"
          buttonText="Go back to Eat-Out page"
        >
          It&apos;s seems we couldn&apos;t find any restaurants under this
          category.
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
      {!isLoading && filteredList.length > 0 && (
        <div className="category-page">
          <Breadcrumbs />
          <h1 className="category-page__title h1">
            The best places for {categoryName.toUpperCase()}!
          </h1>
          <Grid columnCount={3}>
            {filteredList.map((restaurant, index) => {
              return (
                <RestaurantCard
                  key={index}
                  type="extended"
                  restaurantId={restaurant.id}
                  name={restaurant.name}
                  imageUrl={restaurant.image}
                  reviewCount={restaurant.rating.userCount}
                  restaurantRating={restaurant.rating.score.toFixed(1)}
                  categories={restaurant.categories}
                  openingHours={restaurant.openingHours[0].hours}
                  website={restaurant.website}
                  address={restaurant.address}
                  description={restaurant.description}
                  currentUser={currentUser}
                  likes={restaurant.likes}
                  checkIns={restaurant.checkIns}
                  coordinates={restaurant.coordinates}
                />
              );
            })}
          </Grid>
        </div>
      )}
    </Main>
  );
};

CategoryPage.propTypes = {
  match: PropTypes.object,
};

export default CategoryPage;
