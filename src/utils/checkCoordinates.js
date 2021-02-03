// takes in a restaurantList, converts address of each restaurant to coordinates, returns udpated list and updates the DB

export const checkCoordinates = (restaurantList) => {
  let timer = 500; // adds timing between patches to avoid JSON server crash
  const updatedList = [...restaurantList];
  updatedList.forEach((restaurant) => {
    if (!restaurant.coordinates) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${restaurant.address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => {
          setTimeout(() => {
            pacthDb(restaurant.id, res.results[0].geometry.location);
          }, timer);
          timer += 300;
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  });
  return updatedList;
};

const pacthDb = (id, coordinates) => {
  fetch(`${process.env.REACT_APP_DATABASE_URL}/restaurantList/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      coordinates: coordinates,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};
