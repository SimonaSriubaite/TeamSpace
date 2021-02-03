// takes a list of restaurants with coordinates and returns a list updated with distances to User

export const getDistances = (restaurantList, userLocation) => {
  // in case restaraunt does not have coordinates yet, we skip it
  const newList = restaurantList.filter((restaurant) => restaurant.coordinates);
  newList.forEach((restaurant) => {
    restaurant.distance = calcDistance(
      parseFloat(restaurant.coordinates.lat),
      parseFloat(restaurant.coordinates.lng),
      parseFloat(userLocation.latitude),
      parseFloat(userLocation.longitude)
    );
  });
  return newList;
};

const calcDistance = (lat1, lon1, lat2, lon2) => {
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};
