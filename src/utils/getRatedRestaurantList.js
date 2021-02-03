export const getRatedRestaurantList = (arr) => {
  arr.forEach((restaurant) => {
    restaurant.restaurantRating =
      restaurant.reviews.length && calculateRating(restaurant.reviews);
  });
  return arr;
};

const calculateRating = (reviews) => {
  let sum = 0;
  reviews.forEach((review) => {
    sum = sum + parseInt(review.rating);
  });
  return sum / reviews.length;
};
