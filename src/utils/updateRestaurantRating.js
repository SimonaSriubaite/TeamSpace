export const updateRestaurantRating = (restaurantId) => {
  fetch(
    `${process.env.REACT_APP_DATABASE_URL}/restaurantReviews?restaurantId=${restaurantId}`
  )
    .then((res) => res.json())
    .then((reviews) => {
      let sum = 0;
      reviews.forEach((review) => {
        sum = sum + parseInt(review.rating);
      });
      postRating(sum / reviews.length, reviews.length, restaurantId);
    })
    .catch((error) => {
      alert(
        "Something went wrong while trying to update the restaurant rating: " +
          error
      );
    });
};

const postRating = (averageRating, reviewCount, restaurantId) => {
  fetch(
    `${process.env.REACT_APP_DATABASE_URL}/restaurantList/${restaurantId}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        rating: {
          score: averageRating,
          userCount: reviewCount,
        },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )
    .then((response) => response.json())
    .catch((error) => {
      alert(
        "Something went wrong while trying to update the restaurant rating: " +
          error
      );
    });
};
