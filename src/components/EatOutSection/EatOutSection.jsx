import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./EatOutSection.scss";
import { Grid, Button, RestaurantCard } from "components";

const EatOutSection = () => {
  const [restaurantList, setRestaurantList] = useState(null);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_DATABASE_URL}/restaurantList?_sort=rating.score&_order=desc`
    )
      .then((res) => res.json())
      .then((res) => {
        setRestaurantList(res);
      })
      .catch((error) => {});
  }, []);

  if (!restaurantList) {
    return null;
  } else {
    const topRestaurants = restaurantList.slice(0, 2);
    return (
      <section className="eat-out-section">
        <Grid columnCount={3}>
          <article className="header-card">
            <h2 className="header-card__title">
              View all your favourite lunch spots and more
            </h2>
            <Link to="/eat-out" className="header-card__link">
              <Button type="medium">Browse list</Button>
            </Link>
          </article>
          {topRestaurants.map((restaurant, index) => {
            return (
              <RestaurantCard
                key={index}
                type="basic"
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
                likes={restaurant.likes}
                checkIns={restaurant.checkIns}
                currentUser="Aubrey Plaza" // need to discuss with the team at which level currentUser should be fetched. It's seems logical to do it once at top level component.
              />
            );
          })}
        </Grid>
      </section>
    );
  }
};

export default EatOutSection;
